# Análise multitemporal da dinâmica de inundação na Nhecolândia (Pantanal)

Repositório com os códigos utilizados no artigo **"Análise multitemporal
da dinâmica de inundação na Nhecolândia (Pantanal)"**, apresentado no
**IX Geopantanal**.

Os notebooks foram desenvolvidos para processar rasters de água/não água
e caracterizar a dinâmica temporal da inundação no Pantanal, incluindo
frequência, persistência, sazonalidade e mudanças entre anos.

## Conteúdo do repositório

  -----------------------------------------------------------------------
  Arquivo                             Descrição
  ----------------------------------- -----------------------------------
  `Pantanal_Analise_19_25.ipynb`      Analisa 12 rasters mensais de um
                                      ano (jan.--dez.) e produz métricas
                                      e mapas da dinâmica de inundação. O
                                      notebook está configurado
                                      originalmente para 2019.

  `sintese_pantanal.ipynb`            Compara os anos de 2019, 2021 e
                                      2025, combinando classes
                                      hidrológicas, persistência da água
                                      e eventos de transição entre água e
                                      não água.
  -----------------------------------------------------------------------

## Requisitos

Os notebooks foram preparados para execução no **Google Colab**. As
principais bibliotecas utilizadas são:

-   Python 3
-   NumPy
-   Rasterio
-   Pandas
-   Matplotlib
-   ImageIO (para gerar a animação GIF no primeiro notebook)

As instalações de `rasterio` e `imageio` estão incluídas no primeiro
notebook. No segundo, a instalação de `rasterio` também é realizada no
próprio código.

## Dados de entrada

Os dados raster não estão incluídos neste repositório. É necessário
disponibilizar os arquivos de entrada antes de executar os notebooks.

### 1. Análise mensal

O notebook `Pantanal_Analise_19_25.ipynb` utiliza 12 arquivos GeoTIFF
mensais, com valores binários:

-   `1`: água;
-   `0`: não água.

Os arquivos devem ser nomeados com as abreviações dos meses (`jan.tif`,
`fev.tif`, ..., `dez.tif`) e organizados em uma mesma pasta. No
notebook, ajuste as variáveis `PASTA_ENTRADA` e `PASTA_SAIDA` para
indicar os diretórios utilizados.

O primeiro raster (janeiro) é adotado como referência espacial. Quando
necessário, os demais são reprojetados para essa grade com reamostragem
pelo vizinho mais próximo, apropriada para dados categóricos.

### 2. Síntese multianual

O notebook `sintese_pantanal.ipynb` utiliza três produtos raster para
cada ano (2019, 2021 e 2025):

-   classes hidrológicas;
-   persistência da água;
-   número de eventos de transição entre água e não água.

Edite a variável `BASE` e os caminhos definidos no dicionário `paths`,
na seção **4. CONFIGURAÇÃO**, de acordo com a organização dos seus
arquivos. Ajuste também `class_ranges` caso os valores das classes
hidrológicas sejam diferentes dos exemplos fornecidos.

**Importante:** os rasters de entrada da síntese devem estar
espacialmente alinhados, com a mesma dimensão, extensão, resolução e
sistema de referência de coordenadas (SRC/CRS). O código verifica as
dimensões; a compatibilidade espacial dos demais parâmetros deve ser
garantida previamente.

## Como executar

1.  Abra o notebook desejado no Google Colab.
2.  Disponibilize os arquivos raster de entrada no Google Drive ou em
    outro local acessível pelo ambiente.
3.  Ajuste os caminhos das pastas e dos arquivos nas seções de
    configuração.
4.  Execute as células em sequência.
5.  Consulte os mapas, tabelas e demais produtos gerados na pasta de
    saída indicada no código.

## Produtos gerados

### `Pantanal_Analise_19_25.ipynb`

O notebook gera, entre outros:

-   frequência de ocorrência de água (número de meses com água por
    pixel);
-   classes hidrológicas;
-   regime predominante entre cheia e seca;
-   estação predominante de inundação;
-   persistência contínua da água;
-   número de eventos de inundação e de seca;
-   primeiro e último mês com água e duração do período;
-   hidrograma mensal da área alagada, em CSV e figura;
-   mapas temáticos, painel síntese e animação GIF;
-   rasters GeoTIFF, que podem ser visualizados em SIG, como QGIS.

### `sintese_pantanal.ipynb`

O notebook compara os períodos:

-   2019--2021;
-   2021--2025;
-   2019--2025.

Cada pixel é classificado em uma das seguintes categorias:

  ------------------------------------------------------------------------
                        Código Classe                Interpretação
  ---------------------------- --------------------- ---------------------
                             0 Sem dado              Ausência de dados
                                                     válidos para a
                                                     comparação

                             1 Expansão              A classe hidrológica
                                                     indica condição mais
                                                     úmida

                             2 Retração/secamento    A classe hidrológica
                                                     indica condição mais
                                                     seca

                             3 Estável               Mesma classe, sem
                                                     mudança relevante nos
                                                     indicadores
                                                     complementares

                             4 Instabilidade         Mesma classe
                               crescente             hidrológica, mas com
                                                     redução da
                                                     persistência e/ou
                                                     aumento dos eventos
  ------------------------------------------------------------------------

São gerados três rasters GeoTIFF, um CSV com estatísticas de área por
classe e uma figura com os mapas de síntese.

## Parâmetros e adaptações

Os caminhos, nomes de arquivos, intervalos das classes hidrológicas e
limiares de mudança podem ser modificados diretamente nos notebooks. As
interpretações dos resultados dependem das características dos dados de
entrada e dos parâmetros adotados; recomenda-se documentar eventuais
alterações ao reproduzir ou adaptar a análise.

## Citação

Caso utilize os códigos em trabalhos acadêmicos, cite o artigo:

> **Análise multitemporal da dinâmica de inundação na Nhecolândia
> (Pantanal).** Trabalho apresentado no IX Geopantanal.

Complete a referência com os dados bibliográficos oficiais do trabalho
(autoria, ano, anais e paginação/DOI, quando disponíveis).

## Licença

Nenhuma licença de uso foi especificada neste repositório. Antes de
reutilizar ou redistribuir os códigos, consulte os responsáveis pelo
projeto ou adicione uma licença explícita ao repositório.
