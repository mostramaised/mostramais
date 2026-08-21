import { NextResponse } from 'next/server';
import type { EditionBook } from '@/app/components/editions/data';

function rowToBook(row: string[]): EditionBook | null {
  const edition = (row[0] ?? '').trim();
  const title = (row[4] ?? '').trim();
  if (!edition || !title) return null;

  return {
    edition,
    coverEye: (row[1] ?? '').trim(),
    coverTitle: (row[2] ?? '').trim(),
    coverYear: (row[3] ?? '').trim(),
    title,
    lead: (row[5] ?? '').trim(),
    downloadLabel: (row[6] ?? '').trim(),
    downloadHref: (row[7] ?? '').trim() || undefined,
    onlineLabel: (row[8] ?? '').trim(),
    onlineHref: (row[9] ?? '').trim() || undefined,
    meta: (row[10] ?? '').trim(),
  };
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/books] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY - returning no books');
    return NextResponse.json(
      { books: [], fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'empty' } }
    );
  }

  try {
    const range = encodeURIComponent('livros!A1:K');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheets API ${res.status}: ${res.statusText}`);

    const data = await res.json() as { values?: string[][] };
    const books = (data.values ?? [])
      .slice(1)
      .map(rowToBook)
      .filter((book): book is EditionBook => book !== null);

    return NextResponse.json(
      { books },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/books] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { books: [], fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'empty' } }
    );
  }
}