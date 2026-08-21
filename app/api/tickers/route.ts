import { NextResponse } from 'next/server';
import { TICKERS, TICKER_COLORS, TICKER_PAGES } from '@/app/components/ticker/data';
import type { TickerColor, TickerData, TickerPage } from '@/app/components/ticker/data';

function isTickerColor(value: string): value is TickerColor {
  return (TICKER_COLORS as string[]).includes(value);
}

function rowsToTicker(rows: string[][], fallback: TickerData): TickerData {
  const body = rows.slice(1);

  const items = body
    .map(row => (row[0] ?? '').trim())
    .filter(item => item.length > 0);

  const declaredColor = body
    .map(row => (row[1] ?? '').trim().toLowerCase())
    .find(isTickerColor);

  if (items.length === 0) return fallback;

  return { color: declaredColor ?? fallback.color, items };
}

async function fetchTicker(
  page: TickerPage,
  sheetId: string,
  apiKey: string
): Promise<TickerData> {
  const fallback = TICKERS[page];

  try {
    const range = encodeURIComponent(`ticker-${page}!A1:B`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) throw new Error(`Sheets API ${res.status}: ${res.statusText}`);

    const data = await res.json() as { values?: string[][] };
    return rowsToTicker(data.values ?? [], fallback);
  } catch (err) {
    console.error(`[/api/tickers] tab "ticker-${page}" failed, using static fallback:`, err);
    return fallback;
  }
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/tickers] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY - using static fallback');
    return NextResponse.json(
      { tickers: TICKERS, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  const resolved = await Promise.all(
    TICKER_PAGES.map(page => fetchTicker(page, sheetId, apiKey))
  );

  const tickers = TICKER_PAGES.reduce((acc, page, i) => {
    acc[page] = resolved[i];
    return acc;
  }, {} as Record<TickerPage, TickerData>);

  return NextResponse.json(
    { tickers },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
  );
}
