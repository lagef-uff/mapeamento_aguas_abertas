# Mapeamento de águas abertas no Pantanal

Repositório com os códigos utilizados na análise da dinâmica de inundação na região da Nhecolândia, Pantanal, apresentada no **IX Geopantanal**.

Os scripts processam imagens Sentinel-1 e analisam a ocorrência, a persistência e as mudanças temporais das áreas alagadas.

## Arquivos

| Arquivo | Descrição |
|---|---|
| `processamento_sar_sentinel_gee.js` | Processamento mensal de imagens Sentinel-1 (polarização VH) no Google Earth Engine, com filtragem, classificação de água e vetorização. |
| `Pantanal_Analise_19_25.ipynb` | Análise de 12 rasters mensais de água/não água. Calcula frequência, classes hidrológicas, regime sazonal, persistência, eventos de inundação e seca e área alagada mensal. |
| `sintese_pantanal.ipynb` | Compara os indicadores hidrológicos de 2019, 2021 e 2025, classificando expansão, retração, estabilidade e instabilidade da inundação. |

## Execução

### 1. Processamento Sentinel-1

Abra `processamento_sar_sentinel_gee.js` no [Google Earth Engine Code Editor](https://code.earthengine.google.com/).

O script utiliza imagens Sentinel-1 GRD, polarização VH, órbita descendente e resolução de 10 m.

Ajuste, conforme necessário, a área de estudo (`geometry`), o raio de suavização (`SMOOTHING_RADIUS`), o limiar de classificação (`THRESHOLD`) e o período (`START_YEAR`, `START_MONTH`, `END_YEAR` e `END_MONTH`).

### 2. Análise mensal

Execute `Pantanal_Analise_19_25.ipynb` no Google Colab ou em ambiente Python compatível.

São necessários 12 rasters GeoTIFF mensais, com valores binários (`1` = água; `0` = não água), nomeados de `jan.tif` a `dez.tif`.

Ajuste os caminhos de entrada e saída no notebook. Os rasters devem representar a mesma área de estudo; diferenças de grade são ajustadas à referência do primeiro mês.

### 3. Síntese multianual

Execute `sintese_pantanal.ipynb` no Google Colab.

O notebook utiliza nove rasters de entrada: classes hidrológicas, persistência da água e eventos, para cada um dos anos de 2019, 2021 e 2025.

Ajuste a pasta de trabalho (`BASE`), os caminhos no dicionário `paths` e os intervalos das classes (`class_ranges`). Os rasters devem ter as mesmas dimensões, extensão, resolução e sistema de referência de coordenadas (SRC/CRS).

## Produtos

A análise mensal gera rasters GeoTIFF, mapas, tabelas em CSV, hidrograma da área alagada e animação GIF.

A síntese multianual gera três rasters GeoTIFF — 2019–2021, 2021–2025 e 2019–2025 —, estatísticas de área por classe em CSV e um mapa comparativo.

## Dependências

Os notebooks utilizam Python 3 e as bibliotecas NumPy, Rasterio, Pandas, Matplotlib e ImageIO (para a animação GIF). As instalações necessárias estão indicadas nos próprios notebooks.

## Citação

**Análise multitemporal da dinâmica de inundação na Nhecolândia (Pantanal).** Trabalho apresentado no IX Geopantanal. Consulte a publicação e os anais do evento para completar os dados bibliográficos.
