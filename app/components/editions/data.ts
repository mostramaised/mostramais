export type EditionMedia =
  | { kind: 'image'; src: string; caption: string }
  | { kind: 'video'; src: string; poster?: string; caption: string }
  | { kind: 'block'; label: string; color: string }
  | { kind: 'pdf'; src: string; caption: string };

export interface EditionProject {
  id: string;
  edition: string;
  year: string;
  title: string;
  author: string;
  area: string;
  tag: string;
  accent: string;
  bg: string;
  short: string;
  desc: string;
  advisor?: string;
  coverImg?: string;
  media: EditionMedia[];
}

export interface EditionBook {
  edition: string;
  coverEye: string;
  coverTitle: string;
  coverYear: string;
  title: string;
  lead: string;
  downloadLabel: string;
  downloadHref?: string;
  onlineLabel: string;
  onlineHref?: string;
  meta: string;
}

export interface Edition {
  id: string;
  year: string;
}

/** Fallback usado quando a aba `edicoes` está vazia ou indisponível. */
export const EDITIONS: Edition[] = [
  { id: '2', year: '2026' },
  { id: '1', year: '2025' },
];

export const ALL_PROJECTS: EditionProject[] = [
  // ── Edition 02 · 2026 ────────────────────────────────────────────────────
  {
    id: 'mapa-coletivos',
    edition: '02',
    year: '2026',
    title: 'Mapa dos Coletivos',
    author: 'Tiago Ramos',
    area: 'DIGITAL',
    tag: 'PLATAFORMA WEB',
    accent: '#ed3e8c',
    bg: '#3056a6',
    short: 'Plataforma para conectar coletivos de design independente do Sul do Brasil.',
    desc: 'O Mapa dos Coletivos é uma plataforma web colaborativa que cataloga e conecta mais de 120 coletivos de design atuantes na região Sul. A interface combina um mapa interativo, filtros por área de atuação e fichas detalhadas de cada coletivo — com links para portfólios, convocatórias abertas e contatos diretos. O projeto nasceu de uma série de entrevistas conduzidas ao longo de 2025 e se propõe a ser um acervo vivo, mantido pela própria comunidade.',
    advisor: 'Prof. Carla Montano',
    coverImg: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80',
    media: [
      { kind: 'image', src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80', caption: 'Home — mapa interativo com recorte regional' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', caption: 'Ficha de coletivo, com convocatórias abertas' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', caption: 'Dashboard de contribuição da comunidade' },
    ],
  },
  {
    id: 'terminal-escola',
    edition: '02',
    year: '2026',
    title: 'Terminal da Escola',
    author: 'Léo Fernandes',
    area: 'DIGITAL',
    tag: 'FERRAMENTA INTERNA',
    accent: '#f9a52b',
    bg: '#E72818',
    short: 'Visualizador do acervo de TCCs da Escola de Design, em linha de comando.',
    desc: 'Terminal da Escola é uma ferramenta CLI + web que permite navegar pelo acervo de trabalhos de conclusão da Escola de Design sem depender de buscas genéricas. O recorte é curatorial: só TCCs aprovados, indexados por orientador, ano, tema e materiais. A versão web reproduz a experiência do terminal com atalhos de teclado e sessões persistentes.',
    advisor: 'Prof. Henrique Serra',
    coverImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    media: [
      { kind: 'image', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80', caption: 'Visão do terminal — listagem por orientador' },
      { kind: 'video', src: 'https://cdn.pixabay.com/video/2020/04/30/38683-415083026_large.mp4', poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80', caption: 'Walkthrough das queries e atalhos' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=1200&q=80', caption: 'Resultado de busca com filtros encadeados' },
    ],
  },
  {
    id: 'ensaio-tipografico',
    edition: '02',
    year: '2026',
    title: 'Ensaio Tipográfico',
    author: 'Helena Prado',
    area: 'DIGITAL',
    tag: 'SITE EXPERIMENTAL',
    accent: '#3056a6',
    bg: '#f9a52b',
    short: 'Site experimental que lê textos acadêmicos e os compõe como objeto tipográfico.',
    desc: 'Um editor/leitor que recebe um artigo acadêmico e o recompõe em uma tipografia reativa: o tamanho de cada parágrafo responde à densidade semântica, as quebras de linha seguem a respiração do orador. O projeto é um ensaio sobre como a tela pode se comportar como uma página editorial, sem imitá-la.',
    advisor: 'Prof. Ana Beatriz Lins',
    coverImg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
    media: [
      { kind: 'image', src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80', caption: 'Home — composição reativa por densidade' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&q=80', caption: 'Vista editorial do artigo lido' },
    ],
  },
  {
    id: 'acervo-som',
    edition: '02',
    year: '2026',
    title: 'Acervo em Som',
    author: 'Marcos Vieira',
    area: 'DIGITAL',
    tag: 'APP MÓVEL',
    accent: '#ed3e8c',
    bg: '#2D155B',
    short: 'App que narra em áudio peças do acervo permanente da Escola.',
    desc: 'Acervo em Som é um aplicativo móvel que combina áudio-descrições curtas, entrevistas e paisagens sonoras para apresentar peças do acervo permanente da Escola de Design. O objetivo é permitir que visitantes e alunos explorem o acervo mesmo à distância — e que trabalhos menos conhecidos ganhem uma nova camada de leitura.',
    advisor: 'Prof. Daniela Rocha',
    coverImg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    media: [
      { kind: 'image', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80', caption: 'Tela de reprodução — ficha sonora' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80', caption: 'Exploração por trilhas curatoriais' },
    ],
  },
  {
    id: 'retina',
    edition: '02',
    year: '2026',
    title: 'Retina',
    author: 'Juliana Alves & Rafael Lima',
    area: 'DIGITAL',
    tag: 'INSTALAÇÃO GENERATIVA',
    accent: '#f9a52b',
    bg: '#000',
    short: 'Instalação generativa que traduz o ritmo da sala em composições visuais.',
    desc: 'Retina é uma instalação digital instalada no saguão da Escola durante a MOSTRA+ 02. Câmeras e sensores capturam movimento e luminosidade no espaço e traduzem esses dados, em tempo real, numa composição tipográfica projetada em três superfícies. A cada visitante a peça se reconfigura — convidando a permanência, não o clique.',
    advisor: 'Prof. Bruno Ferraz',
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    media: [
      { kind: 'video', src: 'https://cdn.pixabay.com/video/2020/04/30/38683-415083026_large.mp4', poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', caption: 'Captura da instalação no saguão' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80', caption: 'Composição tipográfica gerada em tempo real' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=1200&q=80', caption: 'Detalhe da projeção lateral' },
    ],
  },
  {
    id: 'arquivo-aberto',
    edition: '02',
    year: '2026',
    title: 'Arquivo Aberto',
    author: 'Beatriz Nogueira',
    area: 'DIGITAL',
    tag: 'PUBLICAÇÃO DIGITAL',
    accent: '#3056a6',
    bg: '#ed3e8c',
    short: 'Publicação digital com os bastidores da curadoria da 02ª edição.',
    desc: 'Arquivo Aberto é uma publicação digital em formato scrollytelling que documenta o processo curatorial da MOSTRA+ 02: critérios de seleção, dúvidas, discussões e a lista final. A proposta é tornar transparente um processo que costuma ser invisível — e servir de referência para as próximas edições.',
    advisor: 'Prof. Carla Montano',
    coverImg: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    media: [
      { kind: 'image', src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80', caption: 'Capa da publicação' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80', caption: 'Capítulo sobre critérios curatoriais' },
      { kind: 'image', src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80', caption: 'Nota de rodapé, reformulada' },
    ],
  },

  // ── Edition 06 · 2025 ────────────────────────────────────────────────────
  {
    id: 'p6',
    edition: '06',
    year: '2025',
    title: 'Atlas de Feiras Populares',
    author: 'Clara Siqueira',
    area: 'GRÁFICO',
    tag: 'PUBLICAÇÃO',
    accent: '#ed3e8c',
    bg: '#f9a52b',
    short: 'Cartografia ilustrada das feiras livres de Belo Horizonte — tipologia de barracas, fluxos humanos e vocabulário sonoro.',
    desc: 'Cartografia ilustrada das feiras livres de Belo Horizonte — tipologia de barracas, fluxos humanos e vocabulário sonoro. Apresentado na 06ª edição da MOSTRA+ como parte do recorte curatorial de gráfico. O projeto integra o arquivo permanente da Escola de Design.',
    media: [
      { kind: 'block', label: 'Capa', color: '#ed3e8c' },
      { kind: 'block', label: 'Interior p.24', color: '#3056a6' },
      { kind: 'block', label: 'Folheio 0:42', color: '#000' },
      { kind: 'block', label: 'Expositor', color: '#f9a52b' },
    ],
  },
  {
    id: 'p5',
    edition: '06',
    year: '2025',
    title: 'Luminária Samambaia',
    author: 'Diego Machado',
    area: 'PRODUTO',
    tag: 'OBJETO',
    accent: '#f9a52b',
    bg: '#3056a6',
    short: 'Luminária modular em bambu laminado, inspirada na estrutura de folhagem tropical.',
    desc: 'Luminária modular em bambu laminado, inspirada na estrutura de folhagem tropical. Apresentado na 06ª edição da MOSTRA+ como parte do recorte curatorial de produto. O projeto integra o arquivo permanente da Escola de Design.',
    media: [
      { kind: 'block', label: 'Peça acesa', color: '#000' },
      { kind: 'block', label: 'Módulos', color: '#f9a52b' },
      { kind: 'block', label: 'Montagem 1:18', color: '#ed3e8c' },
      { kind: 'block', label: 'Expositor', color: '#3056a6' },
    ],
  },

  // ── Edition 05 · 2024 ────────────────────────────────────────────────────
  {
    id: 'p4',
    edition: '05',
    year: '2024',
    title: 'Tipo Curral',
    author: 'Nina Barreto',
    area: 'GRÁFICO',
    tag: 'TIPOGRAFIA',
    accent: '#ed3e8c',
    bg: '#2D155B',
    short: 'Fonte display inspirada nas pichações de currais mineiros dos anos 1950.',
    desc: 'Fonte display inspirada nas pichações de currais mineiros dos anos 1950. Apresentado na 05ª edição da MOSTRA+ como parte do recorte curatorial de gráfico. O projeto integra o arquivo permanente da Escola de Design.',
    media: [
      { kind: 'block', label: 'Espécimen', color: '#ed3e8c' },
      { kind: 'block', label: 'Glifos', color: '#fff' },
      { kind: 'block', label: 'Expositor', color: '#2D155B' },
    ],
  },
  {
    id: 'p3',
    edition: '05',
    year: '2024',
    title: 'Vestir o Caminho',
    author: 'Helena Farias',
    area: 'MODA',
    tag: 'COLEÇÃO',
    accent: '#ed3e8c',
    bg: '#E72818',
    short: 'Coleção cápsula sobre uniformes de ciclistas de entrega urbana.',
    desc: 'Coleção cápsula sobre uniformes de ciclistas de entrega urbana. Apresentado na 05ª edição da MOSTRA+ como parte do recorte curatorial de moda. O projeto integra o arquivo permanente da Escola de Design.',
    media: [
      { kind: 'block', label: 'Look 01', color: '#000' },
      { kind: 'block', label: 'Look 04', color: '#f9a52b' },
      { kind: 'block', label: 'Desfile 2:30', color: '#ed3e8c' },
      { kind: 'block', label: 'Expositor', color: '#E72818' },
    ],
  },
];
