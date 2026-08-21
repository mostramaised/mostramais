# MOSTRA+

Site oficial da MOSTRA+, exposição de projetos de conclusão de curso da Escola de Design | UEMG. A 02ª edição acontece de 05 a 22 de maio de 2026 na ECED e no Auditório da ED, em Belo Horizonte.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Google Sheets API v4** — CMS de praticamente todo o conteúdo do site
- **Google Drive** — hospedagem de imagens, vídeos e PDFs

## Estrutura

```
app/
├── page.tsx                  # SPA router principal
├── [...slug]/page.tsx        # Rotas por seção (/edicoes, /cronograma, /faq…)
├── api/
│   ├── projects/route.ts     # Abas `projects` e `edicoes`
│   ├── books/route.ts        # Aba `livros`
│   ├── schedule/route.ts     # Aba `cronograma`
│   ├── faq/route.ts          # Aba `faq`
│   ├── contact/route.ts      # Aba `contato`
│   ├── bastidores/route.ts   # Aba `bastidores`
│   └── tickers/route.ts      # Abas `ticker-*`
├── components/
│   ├── header/               # Navegação
│   ├── hero/                 # Seção de abertura
│   ├── about/                # Sobre a mostra e parceiros
│   ├── manifesto/            # Manifesto
│   ├── editions/             # Acervo de projetos (EditionsPage + EditionDetail)
│   ├── schedule/             # Cronograma
│   ├── faq/                  # Perguntas frequentes
│   ├── contact/              # Contato, redes e links úteis
│   ├── mostra-mais/          # Mostra+ um pouco (galeria + formulário)
│   ├── ticker/               # Faixa animada (uma por página)
│   └── footer/               # Rodapé
└── globals.css               # Estilos globais (design system)
```

Cada componente tem um `data.ts` co-localizado com todo o conteúdo textual. Apenas títulos e nomes de botões ficam no JSX.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```
GOOGLE_API_KEY=AIza...
GOOGLE_SHEETS_ID=<id-da-planilha>
```

- A chave de API deve ter acesso apenas à **Google Sheets API**
- A planilha precisa estar compartilhada como **Visualizador (Anyone with the link)**
- Sem essas variáveis, cada rota cai no seu fallback (veja a tabela abaixo)

## Preenchendo a planilha

Cada aba é lida por uma rota, com cache de 5 minutos (`revalidate: 300`). Quando a aba está ausente, vazia ou a API falha, a rota devolve o fallback indicado e responde com `fallback: true` — o site nunca quebra por causa da planilha.

| Aba                 | Rota               | Fallback                                    |
| ------------------- | ------------------ | ------------------------------------------- |
| `edicoes`           | `/api/projects`    | `EDITIONS` (`editions/data.ts`)             |
| `projects`          | `/api/projects`    | `ALL_PROJECTS` (`editions/data.ts`)         |
| `contato`           | `/api/contact`     | `CONTACT_DATA` (`contact/data.ts`)          |
| `livros`            | `/api/books`       | lista vazia — a seção mostra “em breve”     |
| `cronograma`        | `/api/schedule`    | `SCHEDULE` (`schedule/data.ts`)             |
| `faq`               | `/api/faq`         | `FAQS` (`faq/data.ts`)                      |
| `bastidores`        | `/api/bastidores`  | `GALLERY` (`mostra-mais/data.ts`)           |
| `ticker-*`          | `/api/tickers`     | `TICKERS` (`ticker/data.ts`)                |

`edicoes` e `projects` são lidas em paralelo pela mesma rota e falham de forma independente; o mesmo vale para cada aba `ticker-*` entre si.

As seções abaixo descrevem a estrutura técnica de cada aba. Para o guia completo de preenchimento — voltado à equipe de conteúdo, com explicação campo a campo, exemplos e erros comuns — veja **[PLANILHA.md](PLANILHA.md)**.

## Google Sheets — estrutura da aba `edicoes`

Define quais edições existem no site: cada linha vira um botão de filtro no acervo. A ordem das linhas é a ordem dos filtros, e a primeira linha é a edição selecionada por padrão. A aba é lida por `/api/projects` e devolvida no campo `editions`.

| Coluna | Campo  | Uso                                          |
| ------ | ------ | -------------------------------------------- |
| A      | `id`   | número da edição (`1`, `2`, `3`…), sem zero à esquerda |
| B      | `year` | ano da edição (`2026`)                       |

O `id` precisa bater exatamente com a coluna `edition` das abas `projects` e `livros`. Se a aba não existir ou estiver vazia, `EDITIONS` em `app/components/editions/data.ts` é usado como fallback.

## Google Sheets — estrutura da aba `projects`

| Coluna | Campo       | Observação                                  |
| ------ | ----------- | ------------------------------------------- |
| A      | `id`        | identificador único (número ou slug)        |
| B      | `edition`   | igual ao `id` da aba `edicoes` (`1`, `2`…)  |
| C      | `year`      | ano (`2026`)                                |
| D      | `title`     | título do projeto                           |
| E      | `author`    | nome do aluno                               |
| F      | `area`      | `gráfico`, `produto`, `moda` ou `ambientes` |
| G      | `tag`       | subtítulo curto (ex: `IDENTIDADE VISUAL`)   |
| H      | `short`     | descrição de uma linha                      |
| I      | `desc`      | descrição completa                          |
| J      | `advisor`   | orientador (opcional)                       |
| K      | `coverImg`  | URL de imagem no Drive (`/file/d/ID/view`)  |
| L–AQ   | `media_N_*` | até 8 slots de mídia (4 colunas cada)       |

Cada slot de mídia ocupa 4 colunas na ordem `tipo`, `link`, `extra`, `legenda` — a 1ª em L–O, a 2ª em P–S, e assim por diante até a 8ª em AN–AQ. O parser para no primeiro slot com `tipo` vazio, então os slots preenchidos precisam ser contíguos.

**Tipos de mídia** e o que cada coluna significa:

| `tipo`  | `link`        | `extra`                | `legenda`                  |
| ------- | ------------- | ---------------------- | -------------------------- |
| `image` | URL da imagem | —                      | legenda                    |
| `video` | URL do vídeo  | URL da imagem de capa  | legenda                    |
| `block` | —             | cor de fundo (`#000`)  | texto exibido no bloco     |
| `pdf`   | URL do PDF    | —                      | legenda                    |

URLs do Google Drive são normalizadas automaticamente: imagens viram `thumbnail?id=…&sz=w1200` e vídeos viram `/preview`. Links de **pasta** do Drive são descartados (não servem como imagem), e o `src` de `pdf` é usado exatamente como informado, sem normalização.

## Google Sheets — estrutura da aba `contato`

Use uma linha de cabeçalho seguida por uma linha para cada item. A coluna `tipo` aceita `channel`, `social`, `link` ou `address`.

| Coluna | Campo   | Uso                                              |
| ------ | ------- | ------------------------------------------------ |
| A      | `tipo`  | `channel`, `social`, `link` ou `address`         |
| B      | `label` | rótulo do canal, nome da rede ou título do link  |
| C      | `value` | e-mail, handle ou endereço                       |
| D      | `href`  | URL ou `mailto:` (não usado em `address`)       |
| E      | `meta`  | descrição do link (usado em `link`)              |
| F      | `color` | cor da rede social (usado em `social`)           |

Os dados da aba `contato` são carregados em `/api/contact`; sem configuração ou em caso de erro, os valores de `app/components/contact/data.ts` são usados como fallback.

## Google Sheets — estrutura da aba `livros`

Use uma linha de cabeçalho seguida por uma linha para cada edição. A coluna `edition` deve corresponder ao id da edição (`1`, `2`, etc.). A aba é carregada por `/api/books`.

| Coluna | Campo           | Uso                                      |
| ------ | --------------- | ---------------------------------------- |
| A      | `edition`       | id da edição                             |
| B      | `coverEye`      | texto pequeno na capa                    |
| C      | `coverTitle`    | título exibido na capa                   |
| D      | `coverYear`     | ano exibido na capa                      |
| E      | `title`         | título principal do bloco                |
| F      | `lead`          | descrição do livro                       |
| G      | `downloadLabel` | texto do botão de download               |
| H      | `downloadHref`  | link do PDF/download                     |
| I      | `onlineLabel`   | texto do botão de leitura online         |
| J      | `onlineHref`    | link para leitura online                 |
| K      | `meta`          | ISBN, editora, local e outras informações|

Os links são opcionais: o botão correspondente não aparece quando sua URL está vazia. Sem configuração ou em caso de erro, a seção exibe o estado “em breve” até que uma linha seja adicionada à planilha.

## Google Sheets — estrutura da aba `cronograma`

Uma linha por fase, exibidas na ordem das linhas. A aba é lida por `/api/schedule`. Linhas sem `phase` ou sem `title` são ignoradas.

| Coluna | Campo    | Uso                                                      |
| ------ | -------- | -------------------------------------------------------- |
| A      | `phase`  | número da fase (`01`, `02`…) — obrigatório               |
| B      | `date`   | data ou período, exibido como está (`02 FEV – 15 MAR 2026`) |
| C      | `title`  | nome da fase — obrigatório                                |
| D      | `body`   | descrição da fase                                         |
| E      | `status` | `done`, `current` ou `next`                               |
| F      | `color`  | cor do marcador (padrão `var(--mm-pink)`)                 |

Qualquer valor não reconhecido em `status` — inclusive a célula vazia — é tratado como `next`. O campo não é calculado a partir da data atual: alguém precisa mover o `current` conforme o cronograma avança.

## Google Sheets — estrutura da aba `faq`

Uma linha por pergunta, exibidas na ordem das linhas. A aba é lida por `/api/faq`. As duas colunas são obrigatórias: uma pergunta sem resposta (ou o contrário) é ignorada.

| Coluna | Campo | Uso        |
| ------ | ----- | ---------- |
| A      | `q`   | a pergunta |
| B      | `a`   | a resposta |

## Google Sheets — estrutura da aba `bastidores`

Use uma linha de cabeçalho seguida por uma linha para cada item da galeria. A aba é lida pelo endpoint `/api/bastidores`.

| Coluna | Campo   | Uso                                                        |
| ------ | ------- | ---------------------------------------------------------- |
| A      | `kind`  | `image`, `video` ou `gif`                                  |
| B      | `title` | título exibido no tile                                     |
| C      | `sub`   | subtítulo exibido no tile                                  |
| D      | `src`   | URL da imagem, vídeo ou GIF                                |
| E      | `poster`| URL da imagem de capa para vídeos (opcional)               |
| F      | `color` | cor de fundo quando não houver mídia (ex: `#111`)          |
| G      | `span`  | `big`, `tall` ou vazio                                     |

Use `kind`, `title`, `sub`, `src`, `poster`, `color` e `span` nas colunas A–G. URLs de arquivos do Google Drive são convertidas automaticamente para thumbnail (imagens/GIFs) ou preview (vídeos).

## Google Sheets — abas `ticker-*`

Cada faixa animada tem sua própria aba, no padrão `ticker-<página>`. As quatro abas são lidas pelo endpoint `/api/tickers`:

| Aba                 | Onde aparece                       |
| ------------------- | ---------------------------------- |
| `ticker-sobre`      | página inicial, abaixo do hero     |
| `ticker-edicoes`    | acervo de projetos                 |
| `ticker-cronograma` | cronograma                         |
| `ticker-faq`        | perguntas frequentes               |

Use uma linha de cabeçalho seguida por uma linha para cada frase da faixa.

| Coluna | Campo   | Uso                                                              |
| ------ | ------- | ---------------------------------------------------------------- |
| A      | `texto` | frase exibida na faixa (uma por linha, na ordem da planilha)     |
| B      | `cor`   | `orange`, `pink` ou `blue` — opcional, basta preencher uma linha |

O `+` entre as frases é adicionado automaticamente. Se a coluna `cor` ficar vazia, a cor padrão da página é mantida. Cada aba tem fallback independente: uma aba ausente, vazia ou com erro usa os valores de `app/components/ticker/data.ts` sem afetar as outras faixas.

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com). Adicione `GOOGLE_API_KEY` e `GOOGLE_SHEETS_ID` nas variáveis de ambiente do projeto na Vercel.
