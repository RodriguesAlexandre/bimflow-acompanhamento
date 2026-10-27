# BIMFlow — Telemetria P. Avelar

Dashboard estático no GitHub Pages, com leitura pública do Google Sheets. Publicação de nomes de usuários e máquinas autorizada pelo solicitante nesta conversa.

## Fonte e atualização
- Fonte: planilha BIMFlow_Telemetria, aba Página1, colunas DataHora, Usuario, Maquina, RevitVersion e PluginVersion.
- A página lê as colunas A:E ao abrir, a cada cinco minutos e pelo botão Atualizar dados. A consulta é somente leitura e não envia telemetria ao endpoint de escrita.
- Se a consulta falhar, a última leitura é preservada; na primeira falha, usa a cópia datada de config.json. A interface identifica esse estado.
- A planilha já permitia leitura pública quando verificada; nenhuma permissão de compartilhamento foi modificada.

## Interpretação
- Cada instalação é uma combinação de máquina e versão do Revit. Havendo mais de uma linha para a combinação, utiliza a data mais recente.
- Usuários são contados separadamente, sem confundir um usuário em duas máquinas com duas pessoas.
- Situação compara versões numéricas de até quatro componentes com referenceVersion, definida em config.json.
- A referência inicial é a release publicada 1.0.39. A compilação local 1.0.40 é identificada como acima da referência, e não como release pública.
- Para mudar a referência após publicar outra release, atualize referenceVersion e referenceRelease em config.json e envie ao GitHub. A planilha não define automaticamente qual versão é oficialmente aprovada.
- DataHora é interpretada no fuso America/Sao_Paulo. Ausência de contato recente não confirma que uma máquina está offline.
- A fonte observada contém apenas uma linha por máquina; ela não fornece histórico completo, comandos executados, duração de uso ou êxito de exportação. O dashboard não infere esses indicadores.

## Publicação
- Hospedagem: subpasta telemetria do repositório bimflow-acompanhamento.
- Não expor tokens do GitHub, credenciais Google ou o endpoint de escrita do Apps Script no frontend.
- Se a planilha deixar de ser pública, substitua a leitura pública por uma integração autenticada no servidor; não coloque credenciais no JavaScript.

## Validação
- 17 verificações de dados, comparação de versões, datas, deduplicação e filtros.
- Leitura ao vivo do Google Sheets confirmada no navegador.
- Busca por Drielly, filtro de versões abaixo da referência e limpeza de filtros conferidos.
- Layout móvel em 390 px sem transbordamento horizontal da página; tabela mantém rolagem própria.
