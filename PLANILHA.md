# Guia da Planilha — MOSTRA+

Este documento explica, aba por aba, **o que escrever em cada coluna** da planilha que alimenta o site da MOSTRA+. Ele foi escrito para quem cuida do conteúdo, não para quem programa: não é preciso saber nada de código para usar.

---

## Como o site lê a planilha

O site **não guarda o conteúdo dentro dele**. Toda vez que alguém abre uma página, ele vai até a planilha, lê as abas e monta o que aparece na tela. Isso significa que **o que estiver escrito na planilha é o que o público vê** — sem precisar avisar ninguém da equipe técnica.

### As cinco regras que valem para todas as abas

**1. A primeira linha é sempre o cabeçalho e nunca aparece no site.**
Use a linha 1 para escrever o nome de cada coluna (`título`, `autor`, `data`…). Ela serve só para vocês se orientarem. O site pula essa linha sempre. Os dados começam na linha 2.

**2. O site conta as colunas — ele não lê o cabeçalho.**

Esta é a regra mais importante do documento.

Para o site, o título do projeto não é "a coluna chamada `título`". É **a 4ª coluna, contando da esquerda para a direita**. Ele conta as colunas, pega o que estiver na 4ª e mostra como título — sem nunca olhar o que está escrito na linha 1.

Daí saem duas consequências opostas:

- **Mudar o texto do cabeçalho não quebra nada.** Escrever `título`, `TÍTULO` ou `nome do projeto` na célula D1 dá no mesmo, porque o site não lê essa linha.
- **Mudar as colunas de lugar quebra tudo.** Porque aí a conta muda.

Imagine que alguém queira acrescentar o curso do aluno e insira uma coluna `curso` antes do título. Na planilha parece tudo certo: cada valor continua embaixo do cabeçalho certo, já que o cabeçalho andou junto com a coluna. Mas o site continua contando:

| O site pega… | Antes tinha | Agora tem | E mostra no site como |
| ------------ | ----------- | --------- | --------------------- |
| a 4ª coluna  | título      | curso     | **título** do projeto |
| a 5ª coluna  | autor       | título    | **autor** do projeto  |
| a 6ª coluna  | área        | autor     | **área** do projeto   |

Tudo o que estava à direita "andou uma casa", e o acervo inteiro aparece embaralhado de uma vez: o curso vira título, o título vira autor, o autor vira área.

O que torna esse erro traiçoeiro é que **a planilha continua com aparência normal** — quem fez a alteração não vê nada de errado, e o problema só aparece no site.

> ⚠️ **Nunca insira, apague, mova ou reordene colunas.** Se precisar de uma coluna nova, fale com a equipe técnica: dá para acrescentar, mas o site precisa ser avisado da nova contagem.
>
> Para deixar de usar um campo, **apague o conteúdo da célula** e deixe a coluna vazia no lugar. Uma coluna vazia não atrapalha — ela segura a posição de todas as que vêm depois.

**3. O nome da aba precisa estar exatamente igual ao indicado aqui.**
Tudo em minúsculas, com acentos e hífens exatamente como escrito. `projects` não é o mesmo que `Projects`; `ticker-sobre` não é o mesmo que `ticker sobre`. Uma aba com o nome errado é o mesmo, para o site, que uma aba que não existe.

**4. As mudanças levam até 5 minutos para aparecer.**
O site guarda uma cópia do conteúdo por 5 minutos para carregar mais rápido. Depois de editar a planilha, espere alguns minutos e atualize a página. Se não mudou depois de 5 minutos, aí sim há algo errado — confira as regras de cada aba abaixo.

**5. A planilha precisa continuar compartilhada como "qualquer pessoa com o link pode ver".**
Se alguém restringir o compartilhamento, o site perde o acesso e as seções ficam vazias.

### O que acontece quando uma linha está incompleta

Cada aba tem **campos obrigatórios**. Se um deles estiver vazio, o site **ignora aquela linha inteira** em silêncio — ela simplesmente não aparece, sem mensagem de erro. As outras linhas continuam funcionando normalmente.

Isso é proposital e é útil: dá para deixar linhas de rascunho na planilha sem publicá-las. Mas também é a explicação para o problema mais comum — *"cadastrei o projeto e ele não aparece"*. Quase sempre é um campo obrigatório em branco. Cada seção abaixo diz quais são os obrigatórios daquela aba.

### Índice de abas

| Aba                 | O que alimenta                                    |
| ------------------- | ------------------------------------------------- |
| `edicoes`           | Quais edições existem (comanda as demais abas)    |
| `projects`          | Os projetos do acervo (a maior e mais importante) |
| `livros`            | O livro de cada edição                            |
| `cronograma`        | As fases do cronograma                            |
| `faq`               | As perguntas frequentes                           |
| `contato`           | E-mails, redes sociais, links e endereço          |
| `bastidores`        | A galeria de fotos e vídeos                       |
| `ticker-sobre`      | A faixa colorida animada da página inicial        |
| `ticker-edicoes`    | A faixa colorida animada do acervo                |
| `ticker-cronograma` | A faixa colorida animada do cronograma            |
| `ticker-faq`        | A faixa colorida animada do FAQ                   |

---

## Aba `edicoes` — as edições da mostra

Esta é a aba que **define quais edições existem** no site. Ela é curtinha — uma linha por edição — mas comanda várias outras coisas, então vale entendê-la antes das demais.

**Campo obrigatório:** `id` (coluna A).

| Coluna | Campo  | O que escrever                                                  |
| ------ | ------ | --------------------------------------------------------------- |
| **A**  | `id`   | **Obrigatório.** Número da edição: `1`, `2`, `3`…, sem zero à esquerda |
| **B**  | `year` | Ano da edição (ex: `2026`)                                       |

### O que esta aba controla

**1. Os botões de filtro do acervo.** Cada linha vira um botão ("Ed. 1", "Ed. 2") na página de edições. Sem linha, não há botão.

**2. A ordem dos botões é a ordem das linhas.** O site não organiza nada sozinho. O costume é deixar **da mais recente para a mais antiga**, com a edição atual no topo.

**3. A primeira linha é a edição aberta por padrão.** Quem entra na página de edições vê essa primeira, já selecionada. Por isso, ao lançar uma edição nova, coloque-a **na primeira linha** — assim ela passa a ser a primeira coisa que o público vê.

**4. O ano da capa do livro.** Quando ainda não existe linha na aba `livros` para a edição, o site desenha a capa provisória usando o `year` daqui.

### Coluna A — `id`

Escreva **só o número, sem zero à esquerda**: `1`, `2`, `3`. Nunca `01` nem `02`.

Este é o mesmo valor usado na coluna `edition` das abas [`projects`](#aba-projects--os-projetos-do-acervo) e [`livros`](#aba-livros--o-livro-de-cada-edição) — e os três precisam combinar **exatamente**. Se aqui estiver `2` e no projeto estiver `02`, o projeto não aparece na listagem.

Na tela, o site escreve "02ª EDIÇÃO" sozinho, adicionando o zero na hora de exibir. Ou seja: `2` na planilha é o certo, mesmo que apareça `02` no site.

### Como criar uma edição nova

1. Abra a aba `edicoes` e **insira uma linha no topo** (logo abaixo do cabeçalho).
2. Escreva o número (`3`) na coluna A e o ano (`2027`) na coluna B.
3. Pronto: o botão "Ed. 3" aparece no site em até 5 minutos, já selecionado por padrão.
4. A partir daí, os projetos cadastrados com `3` na coluna `edition` da aba `projects` passam a aparecer nela.

Não é preciso pedir nada à equipe técnica.

> 📌 **Se a aba não existir, estiver vazia ou tiver só o cabeçalho**, o site volta sozinho para as edições 1 e 2, que ficam guardadas no código como reserva. As páginas continuam funcionando normalmente — mas, enquanto isso, uma edição nova cadastrada em `projects` não terá como aparecer.

> ⚠️ **Cuidado ao apagar uma linha daqui.** Os projetos daquela edição continuam na aba `projects`, mas ficam **inacessíveis no site**, porque deixa de existir um botão que leve até eles. Nada é perdido: basta recadastrar a linha para tudo voltar.

---

## Aba `projects` — os projetos do acervo

É a aba mais longa da planilha. **Cada linha é um projeto** exposto na mostra. As colunas A a K trazem as informações do projeto; da coluna L em diante ficam as mídias (imagens, vídeos, PDFs).

**Campos obrigatórios:** `id` (coluna A) e `título` (coluna D). Sem os dois preenchidos, o projeto não aparece no site.

### Colunas A–K: informações do projeto

| Coluna | Campo         | O que escrever                                                                              |
| ------ | ------------- | ------------------------------------------------------------------------------------------- |
| **A**  | `id`          | **Obrigatório.** Identificador único do projeto                                              |
| **B**  | `edition`     | Número da edição, igual ao `id` cadastrado na aba `edicoes`                                  |
| **C**  | `year`        | Ano da edição: `2026`                                                                        |
| **D**  | `title`       | **Obrigatório.** Título do projeto                                                           |
| **E**  | `author`      | Nome completo do aluno ou egresso                                                            |
| **F**  | `area`        | `gráfico`, `produto`, `moda` ou `ambientes`                                                  |
| **G**  | `tag`         | Subtítulo curto, em poucas palavras (ex: `IDENTIDADE VISUAL`)                                 |
| **H**  | `short`       | Resumo de uma linha, que aparece no card da listagem                                          |
| **I**  | `desc`        | Descrição completa, que aparece na página do projeto                                          |
| **J**  | `advisor`     | Nome do orientador (opcional)                                                                 |
| **K**  | `coverImg`    | Link da imagem de capa                                                                        |

#### Detalhando os campos que têm pegadinha

**A — `id`**
Um código curto e único que identifica o projeto. Use letras minúsculas sem acento e hífens no lugar de espaços: `mapa-coletivos`, `terminal-escola`, `cadeira-jangada`. Também pode ser um número (`001`, `002`), desde que não se repita.

Esse código **entra no endereço da página do projeto** (`mostramais.com/edicoes/mapa-coletivos-nome-do-projeto`). Por isso, uma vez que o projeto foi publicado e o link começou a circular, **não mude mais o `id`** — qualquer link antigo que alguém tenha compartilhado deixa de funcionar.

Dois projetos com o mesmo `id` causam comportamento imprevisível: escolha sempre um valor novo.

**B — `edition`**
Escreva **`1` ou `2`, sem zero à esquerda.** `01` e `02` **não funcionam** — o projeto some da listagem, porque o site compara esse valor com o número da edição exatamente como está escrito. Esse é um dos erros mais comuns e mais difíceis de perceber, já que o site mostra "02ª EDIÇÃO" na tela mesmo com `2` na planilha (ele adiciona o zero sozinho na hora de exibir).

> O número escrito aqui precisa existir na aba [`edicoes`](#aba-edicoes--as-edições-da-mostra). É ela que define quais edições o site conhece: um projeto marcado como `3` só aparece depois que a edição `3` for cadastrada lá.

**F — `area`**
Use exatamente uma destas quatro palavras: **`gráfico`**, **`produto`**, **`moda`** ou **`ambientes`**.

O acento em `gráfico` importa: `grafico` sem acento não é reconhecido. Maiúsculas e minúsculas, por outro lado, tanto faz (`Gráfico` funciona igual).

Cada área tem um par de cores próprio, usado no card e na página do projeto. Se você escrever qualquer outra palavra, o projeto **ainda aparece no site**, mas com as cores padrão (rosa sobre preto), o que costuma destoar do resto da listagem.

**G — `tag`**
Uma classificação curta que aparece ao lado da área, em letras maiúsculas: `IDENTIDADE VISUAL`, `MOBILIÁRIO`, `EDITORIAL`. Duas ou três palavras no máximo — textos longos quebram o layout do card.

**H — `short` e I — `desc`**
São dois textos diferentes, com funções diferentes:

- **`short`** é o resumo que aparece embaixo do título **na listagem do acervo**. Uma frase só, entre 10 e 20 palavras. É o que convence alguém a clicar.
- **`desc`** é o texto completo, que aparece **dentro da página do projeto**, depois que a pessoa clicou. Pode ter vários parágrafos e é onde cabe o contexto todo: a pesquisa, o processo, o resultado.

Evite deixar os dois iguais.

**K — `coverImg`**
O link da imagem de capa do projeto — a que aparece no card da listagem. Veja a seção [Como usar links do Google Drive](#como-usar-links-do-google-drive) no fim do documento.

Se ficar em branco, o card aparece com um fundo colorido sólido no lugar da imagem. Funciona, mas rende uma listagem bem menos atraente.

### Colunas L–AQ: as mídias do projeto

Depois da coluna K vêm as mídias que aparecem **dentro da página do projeto**: fotos, vídeos, PDFs e blocos coloridos.

Cada projeto pode ter **até 8 mídias**. Cada mídia ocupa **4 colunas seguidas**, sempre na mesma ordem: `tipo`, `link`, `extra`, `legenda`.

| Mídia | `tipo` | `link` | `extra` | `legenda` |
| ----- | ------ | ------ | ------- | --------- |
| 1ª    | **L**  | M      | N       | O         |
| 2ª    | **P**  | Q      | R       | S         |
| 3ª    | **T**  | U      | V       | W         |
| 4ª    | **X**  | Y      | Z       | AA        |
| 5ª    | **AB** | AC     | AD      | AE        |
| 6ª    | **AF** | AG     | AH      | AI        |
| 7ª    | **AJ** | AK     | AL      | AM        |
| 8ª    | **AN** | AO     | AP      | AQ        |

> ⚠️ **Não deixe buracos entre as mídias.** O site lê as mídias em sequência e **para na primeira que estiver com o `tipo` vazio**. Se você preencher a 1ª, a 2ª e a 4ª, deixando a 3ª em branco, o site mostra apenas as duas primeiras e **a 4ª é perdida** — mesmo estando preenchida.
>
> Para remover uma mídia do meio, apague-a e **puxe as seguintes para a esquerda**, de modo que as preenchidas fiquem sempre coladas, sem intervalos.

#### Os quatro tipos de mídia

O que você escreve nas colunas `link`, `extra` e `legenda` **muda conforme o `tipo`**. Escreva o tipo em minúsculas.

**`image` — uma foto**

| Coluna    | O que escrever                                            |
| --------- | --------------------------------------------------------- |
| `tipo`    | `image`                                                    |
| `link`    | Link da imagem                                             |
| `extra`   | *Deixe em branco — não é usado*                            |
| `legenda` | Texto que aparece embaixo da foto (opcional, recomendado)  |

**`video` — um vídeo**

| Coluna    | O que escrever                                                        |
| --------- | ---------------------------------------------------------------------- |
| `tipo`    | `video`                                                                |
| `link`    | Link do vídeo                                                          |
| `extra`   | Link de uma **imagem de capa**, exibida antes do play (opcional)       |
| `legenda` | Texto que aparece embaixo do vídeo                                     |

**`pdf` — um documento**

| Coluna    | O que escrever                                     |
| --------- | -------------------------------------------------- |
| `tipo`    | `pdf`                                              |
| `link`    | Link do PDF                                        |
| `extra`   | *Deixe em branco — não é usado*                    |
| `legenda` | Texto que aparece junto do documento               |

> O link do PDF é usado **exatamente como está escrito**, sem nenhum tratamento automático. Cole um link que abra o arquivo direto no navegador e teste-o em uma aba anônima antes de publicar.

**`block` — um bloco de cor com uma frase**

Não é um arquivo: é um retângulo colorido com um texto dentro, usado para dar respiro entre as imagens ou destacar uma frase do projeto.

| Coluna    | O que escrever                                                          |
| --------- | ----------------------------------------------------------------------- |
| `tipo`    | `block`                                                                 |
| `link`    | *Deixe em branco — não é usado*                                         |
| `extra`   | A **cor de fundo** do bloco, em hexadecimal (ex: `#ed3e8c`)             |
| `legenda` | **A frase que aparece dentro do bloco** — aqui a legenda é o conteúdo   |

Se a cor ficar em branco, o bloco fica preto. Veja as cores da identidade na seção [Cores](#cores-da-identidade-visual).

---

## Aba `livros` — o livro de cada edição

Cada linha descreve **o livro de uma edição**. Normalmente esta aba tem pouquíssimas linhas — uma por edição.

**Campos obrigatórios:** `edition` (coluna A) e `title` (coluna E).

| Coluna | Campo           | O que escrever                                                     |
| ------ | --------------- | ------------------------------------------------------------------ |
| **A**  | `edition`       | **Obrigatório.** Número da edição, igual ao `id` da aba `edicoes`, sem zero à esquerda |
| **B**  | `coverEye`      | Linha pequena no topo da capa (ex: `+ EDIÇÃO 02`)                   |
| **C**  | `coverTitle`    | Texto grande no meio da capa (ex: `MOSTRA+`)                        |
| **D**  | `coverYear`     | Ano impresso na capa (ex: `2026`)                                   |
| **E**  | `title`         | **Obrigatório.** Título da seção, ao lado da capa                   |
| **F**  | `lead`          | Parágrafo que descreve o livro                                      |
| **G**  | `downloadLabel` | Texto do botão de download (ex: `Baixar PDF`)                       |
| **H**  | `downloadHref`  | Link do arquivo para download                                       |
| **I**  | `onlineLabel`   | Texto do botão de leitura online (ex: `Ler online`)                 |
| **J**  | `onlineHref`    | Link da versão para ler no navegador                                |
| **K**  | `meta`          | Ficha técnica: ISBN, editora, cidade, ano                           |

**Colunas B, C e D — a capa desenhada.** O site não usa uma imagem da capa: ele **desenha a capa na tela** com esses três textos. `coverEye` é a linha fina de cima, `coverTitle` é o texto grande do meio e `coverYear` é o ano embaixo. Textos longos estouram o desenho — mantenha-os curtos.

**Os dois pares de botões (G+H e I+J).** Cada botão só aparece se o **link** estiver preenchido:

- Preencheu `downloadHref` (H) → o botão de download aparece, escrito com o texto de `downloadLabel` (G).
- Deixou `downloadHref` (H) em branco → **o botão não aparece**, mesmo que `downloadLabel` (G) esteja preenchido.

O mesmo vale para `onlineLabel` e `onlineHref`. Ou seja: **quem liga e desliga o botão é o link, não o texto.** Se o link existe mas o texto ficou em branco, o botão aparece vazio — preencha sempre os dois juntos.

**Enquanto o livro não existe.** Se não houver linha para a edição, o site mostra sozinho um aviso de *"O livro da 0Xª edição em breve"*, com a capa desenhada e sem botões. Não é preciso fazer nada: **só crie a linha quando o livro estiver realmente pronto.**

---

## Aba `cronograma` — as fases do cronograma

Cada linha é **uma fase** do cronograma da edição, na ordem em que devem aparecer na página.

**Campos obrigatórios:** `phase` (coluna A) e `title` (coluna C).

| Coluna | Campo    | O que escrever                                            |
| ------ | -------- | --------------------------------------------------------- |
| **A**  | `phase`  | **Obrigatório.** Número da fase: `01`, `02`, `03`…        |
| **B**  | `date`   | Data ou período, escrito por extenso                       |
| **C**  | `title`  | **Obrigatório.** Nome da fase                              |
| **D**  | `body`   | Parágrafo explicando o que acontece nessa fase             |
| **E**  | `status` | `done`, `current` ou `next`                                |
| **F**  | `color`  | Cor da fase                                                |

**A ordem das fases é a ordem das linhas.** O site não organiza nada sozinho: ele mostra as fases exatamente na sequência em que estão na planilha. Para reordenar, mova as linhas.

**A — `phase`.** Aqui o zero à esquerda **é bem-vindo** (`01`, `02`), porque esse campo é só um texto exibido na tela — diferente da coluna `edition` das outras abas.

**B — `date`.** Texto livre, exibido como está. Mantenha o mesmo padrão em todas as linhas para a página ficar visualmente consistente. Exemplos: `26 JAN 2026`, `02 FEV – 15 MAR 2026`, `05 – 18 JAN 2026`.

**E — `status`.** Controla a aparência da fase na linha do tempo. São só três valores, sempre em inglês e minúsculas:

- **`done`** — fase já concluída;
- **`current`** — fase acontecendo agora (destaque na página);
- **`next`** — fase ainda por vir.

Qualquer outra coisa escrita aqui (`concluído`, `atual`, `DONE`, ou a célula vazia) é tratada como **`next`**, sem aviso.

> 📌 **Este campo não se atualiza sozinho.** O site não olha a data de hoje para decidir o que já passou. Alguém precisa entrar na planilha e mover o `current` para a fase seguinte conforme o cronograma avança. Vale combinar isso com a equipe — é o campo que mais fica desatualizado.

Idealmente, só uma fase deve estar como `current` de cada vez.

**F — `color`.** Cor do marcador da fase. Se ficar em branco, o site usa rosa. O ideal é alternar as cores da identidade entre as fases. Veja a seção [Cores](#cores-da-identidade-visual).

---

## Aba `faq` — perguntas frequentes

A aba mais simples da planilha: **cada linha é uma pergunta e sua resposta**, exibidas na ordem das linhas.

**Ambos os campos são obrigatórios.** Uma pergunta sem resposta (ou o contrário) não aparece no site.

| Coluna | Campo | O que escrever         |
| ------ | ----- | ---------------------- |
| **A**  | `q`   | **Obrigatório.** A pergunta |
| **B**  | `a`   | **Obrigatório.** A resposta |

**A — `q`.** Escreva a pergunta **do jeito que uma pessoa perguntaria**, na primeira pessoa e com ponto de interrogação: *"Me formei na UEMG já tem um tempo. Ainda posso participar?"* funciona muito melhor do que *"Egressos"*. É assim que as pessoas encontram a própria dúvida na lista.

**B — `a`.** Responda direto na primeira frase — de preferência começando com "Sim" ou "Não" — e só depois explique. Quem lê o FAQ está com pressa.

Para deixar uma pergunta pronta mas ainda não publicada, escreva a pergunta e **deixe a resposta em branco**: a linha fica guardada na planilha sem aparecer no site.

---

## Aba `contato` — e-mails, redes, links e endereço

Esta aba funciona de um jeito diferente das outras: **todos os blocos da página de contato saem daqui**, e a coluna A diz a qual bloco cada linha pertence.

| Coluna | Campo   | O que escrever                                    |
| ------ | ------- | ------------------------------------------------- |
| **A**  | `tipo`  | **Obrigatório.** `channel`, `social`, `link` ou `address` |
| **B**  | `label` | Nome/rótulo                                       |
| **C**  | `value` | E-mail, @ ou endereço                             |
| **D**  | `href`  | O link                                            |
| **E**  | `meta`  | Descrição do link                                 |
| **F**  | `color` | Cor da rede social                                |

**A coluna A define tudo.** Escreva sempre em minúsculas e em inglês. Se o tipo estiver escrito errado (`canal`, `Social`, `redes`), **a linha inteira é ignorada** — e esse é o erro mais comum desta aba. As linhas podem estar em qualquer ordem: o site separa cada uma no bloco certo automaticamente.

Como as colunas usadas mudam conforme o tipo, veja cada caso:

### `channel` — canais de atendimento

Para e-mails e telefones oficiais.

| Coluna    | O que escrever                                        |
| --------- | ----------------------------------------------------- |
| **B**     | **Obrigatório.** O rótulo (ex: `E-mail`)              |
| **C**     | **Obrigatório.** O valor visível (ex: `mostramais.ed@gmail.com`) |
| **D**     | **Obrigatório.** O link clicável                      |
| E, F      | *Deixe em branco*                                     |

Os três campos são obrigatórios: faltando um, a linha não aparece.

Na coluna D, um e-mail precisa do prefixo **`mailto:`** — assim: `mailto:mostramais.ed@gmail.com`. Sem ele, o clique não abre o programa de e-mail.

### `social` — redes sociais

| Coluna    | O que escrever                                             |
| --------- | ---------------------------------------------------------- |
| **B**     | **Obrigatório.** Nome da rede (ex: `Instagram`)            |
| **C**     | **Obrigatório.** O @ do perfil (ex: `@mostramais.ed`)      |
| **D**     | **Obrigatório.** Endereço completo do perfil               |
| E         | *Deixe em branco*                                          |
| **F**     | Cor da rede (opcional — se vazio, fica rosa)               |

Na coluna D escreva o endereço completo, começando com `https://` — por exemplo `https://www.instagram.com/mostramais.ed`. Escrever só `@mostramais.ed` aqui faz o link não funcionar.

### `link` — links úteis

Para edital, formulário de inscrição, ingressos e afins.

| Coluna    | O que escrever                                                 |
| --------- | -------------------------------------------------------------- |
| **B**     | **Obrigatório.** Nome do link (ex: `Edital 2026`)              |
| C         | *Deixe em branco — não é usado neste tipo*                     |
| **D**     | **Obrigatório.** O endereço                                    |
| **E**     | Descrição curta de onde o link leva (ex: `Google Drive · PDF`) |
| F         | *Deixe em branco*                                              |

A coluna E é uma linha fina embaixo do nome que avisa a pessoa o que ela vai encontrar: `Google Forms`, `Sympla`, `Google Drive · PDF`. Vale sempre preencher.

### `address` — endereço

| Coluna    | O que escrever                                          |
| --------- | ------------------------------------------------------- |
| B         | *Deixe em branco*                                       |
| **C**     | **Obrigatório.** Uma linha do endereço                  |
| D, E, F   | *Deixe em branco*                                       |

Atenção: aqui o texto vai na **coluna C**, não na B. Use **uma linha da planilha para cada linha do endereço**, na ordem em que devem aparecer:

| tipo      | label | value                          |
| --------- | ----- | ------------------------------ |
| `address` |       | `Escola de Design · UEMG`      |
| `address` |       | `Av. Antônio Carlos, 7545`     |
| `address` |       | `Belo Horizonte · MG`          |

---

## Aba `bastidores` — a galeria

Cada linha é **um quadro da galeria** de bastidores, exibido na ordem das linhas.

**Campos obrigatórios:** `kind` (coluna A, com um dos três valores válidos) e `title` (coluna B).

| Coluna | Campo    | O que escrever                                  |
| ------ | -------- | ----------------------------------------------- |
| **A**  | `kind`   | **Obrigatório.** `image`, `video` ou `gif`      |
| **B**  | `title`  | **Obrigatório.** Título sobre o quadro          |
| **C**  | `sub`    | Subtítulo (ex: local, data)                     |
| **D**  | `src`    | Link do arquivo                                 |
| **E**  | `poster` | Imagem de capa do vídeo                         |
| **F**  | `color`  | Cor de fundo do quadro                          |
| **G**  | `span`   | `big`, `tall` ou vazio                          |

**A — `kind`.** Só estes três valores, em minúsculas: `image`, `video` ou `gif`. Qualquer outra coisa faz a linha ser ignorada. O tipo define a etiqueta que aparece sobre o quadro (`⌂ Foto`, `▶ Vídeo`, `∞ GIF`).

**D — `src`.** O link do arquivo. Se ficar em branco, o quadro ainda aparece — só com o fundo colorido, o título e o subtítulo, sem mídia. Dá para usar isso de propósito, como um quadro de texto no meio da galeria.

**E — `poster`.** Só faz sentido quando o tipo é `video`: é a imagem que aparece antes de a pessoa dar play. Deixe em branco para fotos e GIFs.

**F — `color`.** A cor que aparece atrás da mídia — visível enquanto a imagem carrega e em todo o quadro, se não houver mídia. Se ficar vazio, fica quase preto (`#111`).

**G — `span` — o tamanho do quadro.** É o que dá ritmo à galeria:

- **vazio** → quadro no tamanho padrão;
- **`big`** → quadro largo, ocupa mais espaço na horizontal;
- **`tall`** → quadro alto, ocupa mais espaço na vertical.

Use com moderação: **um ou dois quadros grandes a cada seis** costuma ficar bem. Se todos forem `big`, o efeito se perde e a galeria vira uma coluna de blocos enormes. Escolha `tall` para fotos em pé e `big` para fotos deitadas — o contrário deixa a imagem cortada.

---

## Abas `ticker-*` — as faixas coloridas animadas

As faixas são aquelas tarjas coloridas que atravessam a tela com frases em letras grandes deslizando de um lado para o outro. **Cada página tem a sua própria aba:**

| Aba                 | Onde a faixa aparece                            |
| ------------------- | ----------------------------------------------- |
| `ticker-sobre`      | Página inicial, logo abaixo da abertura         |
| `ticker-edicoes`    | Acervo, no fim da listagem de projetos          |
| `ticker-cronograma` | Cronograma, no fim da página                    |
| `ticker-faq`        | Perguntas frequentes, no fim da página          |

As quatro abas têm **exatamente a mesma estrutura** e são independentes: mexer em uma não afeta as outras.

**Campo obrigatório:** `texto` (coluna A).

| Coluna | Campo   | O que escrever                                    |
| ------ | ------- | ------------------------------------------------- |
| **A**  | `texto` | **Obrigatório.** Uma frase da faixa               |
| **B**  | `cor`   | `orange`, `pink` ou `blue` (opcional)             |

**A — `texto`: uma frase por linha.** As frases aparecem na ordem das linhas e se repetem em loop.

- **Não escreva o `+` entre as frases.** O site coloca o separador sozinho. Se você digitar, vai aparecer dobrado.
- **Escreva em MAIÚSCULAS.** A faixa não converte o texto automaticamente, e frases em minúsculas destoam das demais.
- **Frases curtas funcionam melhor** — de duas a cinco palavras. Textos longos passam rápido demais para serem lidos.
- **Entre 4 e 6 frases** por faixa é o ideal. Com poucas, a repetição fica óbvia; com muitas, ninguém chega ao fim.

**B — `cor`.** Aceita **somente** `orange`, `pink` ou `blue`, em minúsculas e em inglês — não são aceitos códigos hexadecimais nem `var(--mm-pink)` aqui (essa é uma diferença em relação às abas `cronograma` e `contato`).

Basta preencher **uma célula qualquer** da coluna B: a cor vale para a faixa inteira, não para uma frase só. O costume é preencher na primeira linha de dados e deixar as demais em branco. Se ficar tudo vazio, ou se alguém escrever uma cor inválida, a faixa usa a cor padrão daquela página.

> 📌 **Se a aba não existir, estiver vazia ou tiver só o cabeçalho, a faixa simplesmente não aparece** naquela página — o resto do conteúdo continua normal. É a forma de desligar uma faixa: apague as frases. E, como cada faixa é independente, um problema em uma aba não afeta as outras três.

---

## Como usar links do Google Drive

Vários campos pedem o link de uma imagem, vídeo ou PDF. O jeito recomendado é hospedar o arquivo no Google Drive da mostra.

### Passo a passo

1. Suba o arquivo no Drive da MOSTRA+.
2. Clique com o botão direito → **Compartilhar**.
3. Em "Acesso geral", mude para **"Qualquer pessoa com o link"**, com permissão de **Leitor**.
4. Clique em **Copiar link**.
5. Cole o link direto na célula da planilha.

O link copiado tem esta cara, e é exatamente assim que ele deve ser colado:

```
https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
```

**Não é preciso converter nada.** O site reconhece links do Drive e os transforma sozinho no formato certo para exibir a imagem ou tocar o vídeo.

### O erro mais comum: esquecer o compartilhamento

Se o arquivo continuar restrito, **o link é válido mas a imagem não carrega** — e o site não avisa. Sempre que uma imagem não aparecer, essa é a primeira coisa a conferir. Um teste rápido: abra o link em uma **janela anônima** do navegador. Se pedir login, o site também não vai conseguir ver o arquivo.

### Outras regras importantes

- **Nunca use o link de uma pasta.** Só links de **arquivos individuais** funcionam. Links de pasta (que têm `/folders/` no meio) são ignorados e a imagem não aparece.
- **Um link por célula.** Não cole dois links na mesma célula, nem separados por vírgula.
- **Links de fora do Drive também funcionam** — qualquer endereço público de imagem terminado em `.jpg`, `.png` ou `.gif` serve. O que **não** funciona é o endereço de uma *página* que contém a imagem: é preciso ser o link da imagem em si.
- **Cuidado com PDFs.** Diferentemente das imagens, o link do PDF é usado exatamente como foi colado, sem tratamento. Teste-o em uma janela anônima antes de publicar.

---

## Cores da identidade visual

Alguns campos (`color` no `cronograma` e no `contato`, `extra` dos blocos em `projects`) aceitam uma cor. Use preferencialmente as cores da identidade da MOSTRA+:

| Cor      | Escreva assim      | Ou o código |
| -------- | ------------------ | ----------- |
| Laranja  | `var(--mm-orange)` | `#f9a52b`   |
| Rosa     | `var(--mm-pink)`   | `#ed3e8c`   |
| Azul     | `var(--mm-blue)`   | `#3056a6`   |
| Vermelho | `var(--mm-red)`    | `#e72818`   |
| Violeta  | `var(--mm-violet)` | `#2d155b`   |
| Preto    | `var(--mm-black)`  | `#000000`   |
| Branco   | `var(--mm-white)`  | `#ffffff`   |

**Prefira sempre a forma `var(--mm-...)`.** Escrita assim, se a identidade visual mudar de tom algum dia, o site inteiro se atualiza junto — enquanto os códigos digitados na mão continuariam presos ao tom antigo.

Copie o texto exatamente como está na tabela, incluindo os dois hífens e os parênteses.

> ⚠️ **Atenção:** as abas `ticker-*` são a exceção. Lá a coluna de cor aceita **apenas** `orange`, `pink` ou `blue` — nem `var(--mm-pink)`, nem código hexadecimal.

---

## Guia rápido de problemas

| O que está acontecendo                                | Provável causa                                                                                              |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Editei e nada mudou no site**                       | Espere 5 minutos e atualize a página — o site guarda uma cópia do conteúdo por esse tempo                     |
| **Cadastrei uma linha e ela não aparece**             | Algum campo obrigatório está vazio. Confira quais são, na seção da aba                                        |
| **O projeto não aparece na listagem da edição**       | A coluna `edition` está como `02` em vez de `2`. Tire o zero à esquerda                                       |
| **Criei uma edição nova e o botão não apareceu**      | Falta a linha dela na aba `edicoes` — é essa aba que cria os botões de filtro                                 |
| **Uma edição inteira sumiu do site**                  | A linha dela foi apagada da aba `edicoes`. Recadastre e os projetos voltam a aparecer                         |
| **A edição errada abre primeiro**                     | A ordem das linhas da aba `edicoes` manda: mova a desejada para a primeira linha                              |
| **O projeto aparece com cores estranhas**             | A `area` está escrita fora dos quatro valores aceitos (atenção ao acento em `gráfico`)                        |
| **A imagem não carrega**                              | O arquivo não está compartilhado como "qualquer pessoa com o link", ou é link de pasta em vez de arquivo      |
| **Faltam mídias na página do projeto**                | Há um espaço vazio entre as mídias. Puxe as preenchidas para a esquerda, sem intervalos                       |
| **Uma linha do contato não aparece**                  | A coluna `tipo` está escrita errado — precisa ser `channel`, `social`, `link` ou `address`, em minúsculas     |
| **O botão do livro não aparece**                      | O campo de **link** do botão está vazio; só o texto não basta                                                 |
| **O `+` da faixa aparece dobrado**                    | O `+` foi digitado na planilha. Apague — o site coloca sozinho                                                |
| **A faixa não aparece**                               | A aba está vazia, tem só o cabeçalho, ou o nome da aba está diferente de `ticker-sobre`, `ticker-edicoes`…    |
| **Tudo apareceu embaralhado de uma vez**              | Uma coluna foi inserida, apagada ou movida. Desfaça a alteração (`Ctrl+Z`) e avise a equipe técnica           |
| **Uma seção inteira ficou vazia**                     | A planilha pode ter perdido o compartilhamento público. Confira as permissões                                 |
