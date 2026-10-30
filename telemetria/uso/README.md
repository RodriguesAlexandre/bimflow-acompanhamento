# BIMFlow — Uso dos comandos

Dashboard público por link, na identidade visual da P. Avelar. As três seções — Visão geral, Instalações e Uso — ficam no mesmo endereço, com navegação por hash, sem abrir outra aba. As telas são mantidas em memória para preservar os filtros.

## Dados e atualização

- Fonte: abas EVENTOS e INSTALACOES da planilha de uso do BIMFlow, que permanece privada.
- O Apps Script publica uma leitura com campos permitidos: nomes, máquinas, nomes dos arquivos, comandos, ações, família/tipo, categoria, disciplina, versão, resultado, quantidades e duração da operação.
- Os 24 campos coletados, incluindo IP local, são retornados por autorização expressa do responsável. Senhas e credenciais não são coletadas nem devolvidas. Não há credencial no frontend.
- Link público não é controle de acesso: qualquer pessoa com o link pode consultar os dados publicados. `noindex` é somente uma orientação aos buscadores.
- Um acionador do Apps Script consolida a leitura a cada quinze minutos, mesmo sem visitantes. A página consulta a consolidação ao abrir, a cada minuto enquanto visível e pelo botão Atualizar agora. O botão consulta o snapshot atual; não promete tempo real.
- O cache expira em até quinze minutos e pode ser reconstruído antes, caso o Google o descarte. A interface mostra a data de consolidação e alerta se passar de trinta minutos.
- Limite de leitura: 5.000 eventos mais recentes. A interface avisa se o histórico da planilha ultrapassar esse limite. O histórico completo permanece na planilha privada.
- Em falha de rede, a última leitura da sessão é mantida e identificada. Não há armazenamento de dados pessoais em localStorage nem cópia de registros no Git.

## Como os indicadores são contados

| Indicador | Regra |
| --- | --- |
| Execuções | `biblioteca/abrir_painel`, `biblioteca/carregar_lote`, `catalogo/exportar`, `catalogo/publicar` e `parametros_folhas/carregar`, além de `eletrica/luva_conduletes` e das três ações `hidrossanitario/desvio_*` |
| Pessoas ativas | Usuários distintos nessas execuções; nome Revit, com alternativa Windows |
| Tipos disponibilizados | Eventos `tipo_disponivel` com sucesso; inclui tipos já presentes |
| Falhas | Operações principais com resultado falha; cancelamentos aparecem separadamente |
| Downloads/cache | Arquivos RFA/RVT preparados; não são instâncias inseridas |
| Inserções solicitadas | Início da ferramenta de inserção com sucesso; o usuário ainda pode cancelar |

Deduplicação por UUID. `teste_integracao` fica fora dos indicadores. `publicar_revisao` não duplica o comando publicar. Duração não mede jornada nem produtividade individual.

Filtros de período, comando, pessoa, disciplina e resultado se combinam com a busca. Histórico com paginação e CSV da seleção inteira, protegido contra fórmulas.

## Manutenção

1. Backend e testes do receptor ficam no repositório privado do plugin, em `distribuicao/telemetria/Code.gs` e `Dashboard.gs`.
2. Preserve os endereços das duas implantações. Ao adicionar comandos à lista permitida, atualize também a versão da implantação de ingestão usada pelos plugins. A leitura tem implantação própria no mesmo projeto.
3. A função GET só retorna o dashboard quando `painel=uso` e o callback tem o formato permitido. O POST continua exigindo a chave privada.
4. No Apps Script, confirme o acionador `atualizarSnapshotDashboard`: baseado no tempo, contador de minutos, a cada quinze minutos. O acionador usa a versão de desenvolvimento; mantenha alterações compatíveis e testadas.
5. Após mudar o backend, atualize a implantação de leitura e preserve seu endereço. Se criar outra, atualize somente `endpoint` em `config.json` deste diretório. Não use o endpoint de ingestão nessa configuração.
6. Valide `core.js` e os testes antes de enviar mudanças para `main`. O GitHub Pages publica o frontend.

Enquanto a nova DLL de telemetria não estiver instalada e em uso, o painel pode mostrar zero. O evento técnico inicial não representa uso real.
