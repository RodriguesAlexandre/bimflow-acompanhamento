# Guia da biblioteca BIMFlow

Página pública de operação, resultados e continuidade da solução P. Avelar.

## Atualização do material
- index.html: conteúdo e procedimentos.
- guia/dados.json: data de referência, versões, contagens por disciplina e etapas do fluxograma.
- guia/app.js: renderização dos números, filtros do fluxograma e procedimentos por perfil.
- guia/estilo.css: identidade visual, responsividade e impressão.
- guia/ribbon-atual.svg e guia/estrutura-atual.svg: diagramas editáveis. As versões PNG permitem uso em apresentações.
- guia/painel-online.png: prévia renderizada com o XAML do código e os catálogos privados.
- telemetria/: dashboard conectado à planilha de telemetria; sua configuração é independente deste guia.

## Antes de republicar
1. Conferir as contagens nos três JSONs de cada disciplina. Tipos não incluem pacotes; o total do painel soma tipos e pacotes.
2. Atualizar dados.json e os textos que citam números no HTML, quando necessário.
3. Marcar separadamente código implementado, arquivos migrados, release publicada e homologação no Revit.
4. Revisar as imagens quando a ribbon, a interface ou os caminhos mudarem.
5. Conferir links, filtros, procedimentos, layout móvel e impressão/PDF.
6. Enviar as alterações para main e verificar o resultado do GitHub Pages.

Não publicar tokens, arquivos RFA/RVT privados ou logs com credenciais neste repositório. Os links dos repositórios privados exigem acesso no GitHub.

## Pendências registradas
- Fluxo online homologado pela equipe; novas revisões continuam sujeitas a testes.
- Em trabalho: transferência do plugin, biblioteca e site para o GitHub da P. Avelar, com ajuste de acessos e endereços.
- Integração dos comandos úteis do plugin legado independente.
- Exportadores e validações das outras disciplinas.

Dados conferidos em 27/10/2026: elétrica 564 tipos + 3 pacotes; arquitetura 325 tipos + 3 pacotes. A arquitetura inclui 24 paredes básicas e 48 modelos de vista. As duas disciplinas foram migradas para a biblioteca privada. Elétrica inclui 12 modelos de vista; arquitetura inclui 48. Manutenção do instalador: G:\Drives compartilhados\BIM\PLUG INS\BIMFlow\MANUTENÇÃO INSTALADOR. Versão de referência: 1.0.44.

A versão 1.0.44 permite testar a exportação pelo botão Prévia local antes de Publicar Biblioteca. Atualizar relê a origem ativa; Voltar ao GitHub consulta a revisão distribuída.
