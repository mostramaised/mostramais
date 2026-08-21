export type TickerColor = 'orange' | 'pink' | 'blue';

export type TickerPage = 'sobre' | 'edicoes' | 'cronograma' | 'faq';

export interface TickerData {
  color: TickerColor;
  items: string[];
}

export const TICKER_COLORS: TickerColor[] = ['orange', 'pink', 'blue'];

export const TICKER_PAGES: TickerPage[] = ['sobre', 'edicoes', 'cronograma', 'faq'];

export const TICKERS: Record<TickerPage, TickerData> = {
  sobre: {
    color: 'orange',
    items: [
      // '02ª EDIÇÃO',
      // '05 MAI — 22 MAI',
      // 'ESCOLA DE DESIGN | UEMG',
      // 'ECED · AUDITÓRIO DA ED',
      // 'INSCRIÇÕES ENCERRADAS',
    ],
  },
  edicoes: {
    color: 'pink',
    items: [
      // 'ACERVO ABERTO',
      // '06 EDIÇÕES',
      // '240+ PROJETOS',
      // 'GRÁFICO · PRODUTO · MODA · AMBIENTES',
    ],
  },
  cronograma: {
    color: 'blue',
    items: [
      // 'EDITAL 02',
      // 'INSCRIÇÕES ATÉ 15/03',
      // 'RESULTADO 30/03',
      // 'ABERTURA 05/05',
    ],
  },
  faq: {
    color: 'orange',
    items: [
    //   'AINDA COM DÚVIDAS?',
    //   'ESCREVE PARA MOSTRAMAIS.ED@GMAIL.COM',
    //   'OU NOS CHAME NO INSTAGRAM',
    //   '@MOSTRAMAIS.ED',
    ],
  },
};
