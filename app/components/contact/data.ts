export interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

export interface ContactSocial {
  name: string;
  handle: string;
  href: string;
  color: string;
}

export interface ContactLink {
  label: string;
  meta: string;
  href: string;
}

export interface ContactData {
  channels: ContactChannel[];
  social: ContactSocial[];
  links: ContactLink[];
  address: string[];
}

export const CHANNELS: ContactChannel[] = [
  { label: 'E-mail', value: 'mostramais.ed@gmail.com', href: 'mailto:mostramais.ed@gmail.com' },
];

export const SOCIAL: ContactSocial[] = [
  { name: 'Instagram', handle: '@mostramais.ed', href: 'https://www.instagram.com/mostramais.ed', color: 'var(--mm-pink)' },
];

export const LINKS: ContactLink[] = [
  { label: 'Edital 2026',              meta: 'Google Drive · PDF',   href: 'https://drive.google.com/file/d/121FPRg-xaVhU3Y4zc-NDQwKNrAYclaKs/view?usp=sharing' },
  { label: 'Inscrições de expositor',  meta: 'Google Forms',          href: 'https://forms.gle/KcgFa49Hy9SsKCyz5' },
  { label: 'Ingressos',                meta: 'Sympla',                href: 'https://www.sympla.com.br/evento/mostra---2-edicao-2026/3389074' },
];

export const ADDRESS: string[] = [
  'Escola de Design',
  'Rua Gonçalves Dias, 1434 · Lourdes',
  'Belo Horizonte · MG',
];

export const CONTACT_DATA: ContactData = {
  channels: CHANNELS,
  social: SOCIAL,
  links: LINKS,
  address: ADDRESS,
};
