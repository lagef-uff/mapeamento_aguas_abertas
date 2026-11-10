var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-57.758789206939625, -16.520914573637075],
          [-57.758789206939625, -18.86005026275831],
          [-57.203979636627125, -18.86005026275831],
          [-57.203979636627125, -16.520914573637075]]], null, false);

var roi = geometry;

var display = ee.Image(0).updateMask(0).paint(roi, '000000', 2);
Map.centerObject(roi, 7);
Map.addLayer(display, {palette: '000000'}, 'ROI', true);


// PARÂMETROS GERAIS
var SMOOTHING_RADIUS = 50;   // metros
var THRESHOLD = -24;         // limiar para água em VH (dB)

// Período: jan/2023 até jan/2026
var START_YEAR = 2023;
var START_MONTH = 1;
var END_YEAR = 2026;
var END_MONTH = 1;

// FUNÇÕES AUXILIARES
function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

function monthLabel(y, m) {
  return y + '_' + pad2(m);
}

function monthStartStr(y, m) {
  return y + '-' + pad2(m) + '-01';
}

function nextMonthStr(y, m) {
  var d = new Date(y, m - 1, 1);
  d.setMonth(d.getMonth() + 1);
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-01';
}

// LOOP MENSAL
for (var y = START_YEAR; y <= END_YEAR; y++) {
  var firstMonth = (y === START_YEAR) ? START_MONTH : 1;
  var lastMonth = (y === END_YEAR) ? END_MONTH : 12;

  for (var m = firstMonth; m <= lastMonth; m++) {
    var startDate = monthStartStr(y, m);
    var endDate = nextMonthStr(y, m);
    var label = monthLabel(y, m);

    // Coleção Sentinel-1 VH, órbita descendente, modo IW
    var colecao = ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.eq('instrumentMode', 'IW'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
      .filterMetadata('resolution_meters', 'equals', 10)
      .filterBounds(roi)
      .filterDate(startDate, endDate)
      .select('VH');

    // Composição mensal
    var vh = colecao.median().clip(roi);

    // Filtro para reduzir ruído speckle
    var vhFiltered = vh.focal_mean(SMOOTHING_RADIUS, 'circle', 'meters');

    // Classificação da água
    var water = vhFiltered.lte(THRESHOLD);

    // Camadas no mapa
    Map.addLayer(
      vh,
      {min: -31.5, max: -11},
      'VH ' + label,
      false
    );

    Map.addLayer(
      vhFiltered,
      {min: -31.5, max: -11},
      'VH filtrado ' + label,
      false
    );

    // Mostra automaticamente só janeiro/2026; as demais ficam no painel de layers
    var showWater = (y === 2026 && m === 1);

    Map.addLayer(
      water.updateMask(water),
      {palette: ['0000FF']},
      'Água ' + label,
      showWater
    );

    // Vetorização da água do mês
    var vectors = water.selfMask().rename('water').reduceToVectors({
      geometry: roi,
      scale: 10,
      geometryType: 'polygon',
      eightConnected: false,
      labelProperty: 'water',
      reducer: ee.Reducer.countEvery(),
      maxPixels: 1e13
    });

  }
}
