export const MOSTRA_MAIS_CONTENT = {
  lead: 'A MOSTRA+ surgiu para os alunos mostrarem para a comunidade acadêmica e para a sociedade seus projetos desenvolvidos na Escola de Design. Alguns projetos são interativos e podem ser aprofundados, para além da exposição. A MOSTRA+ UM POUCO veio para isso: uma oportunidade dos alunos mostrarem ainda mais seus trabalhos.',
  galleryLead: 'Foto, vídeo, GIF — um recorte do que aconteceu nas últimas edições.',
};

export const INTEREST_FORM_HREF = 'https://forms.gle/9PyUCgG7QJYm1Brt8';

export type GalleryKind = 'image' | 'video' | 'gif';

export interface GalleryItem {
  kind: GalleryKind;
  title: string;
  sub: string;
  color: string;
  span?: 'big' | 'tall';
  src?: string;
  poster?: string;
}

export const GALLERY: GalleryItem[] = [
  { kind: 'image', title: 'Vernissage ed. 02',      sub: 'Galeria Principal · 2026', color: 'var(--mm-pink)',   span: 'big' },
  { kind: 'video', title: 'Making-of montagem',     sub: '4:12 · 2025',              color: '#111' },
  { kind: 'image', title: 'Portfolio Night',        sub: 'Foyer · 2025',             color: 'var(--mm-blue)' },
  { kind: 'image', title: 'Workshop tipografia',    sub: 'Sala 204 · 2025',          color: 'var(--mm-orange)' },
  { kind: 'image', title: 'Mesa: Design e mercado', sub: 'Auditório B · 2025',       color: '#2D155B',          span: 'tall' },
  { kind: 'gif',   title: 'Loop vinheta',           sub: '00:06 · 2025',             color: '#E72818' },
  { kind: 'image', title: 'Prêmio MOSTRA+',         sub: 'Encerramento · 2025',      color: 'var(--mm-pink)' },
  { kind: 'image', title: 'Acervo físico',          sub: 'Sala de arquivo · 2025',   color: 'var(--mm-blue)' },
  { kind: 'video', title: 'Entrevista curatorial',  sub: '6:30 · 2025',              color: '#111' },
];
