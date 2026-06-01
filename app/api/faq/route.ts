import { NextResponse } from 'next/server';
import { FAQS } from '@/app/components/faq/data';
import type { FaqItem } from '@/app/components/faq/data';

function rowToFaq(row: string[]): FaqItem | null {
  const q = (row[0] ?? '').trim();
  const a = (row[1] ?? '').trim();
  if (!q || !a) return null;
  return { q, a };
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey  = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/faq] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY — using static fallback');
    return NextResponse.json(
      { faqs: FAQS, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  try {
    const range = encodeURIComponent('faq!A1:B');
    const url   = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Sheets API ${res.status}: ${res.statusText}`);
    }

    const data = await res.json() as { values?: string[][] };
    const rows = data.values ?? [];

    const faqs: FaqItem[] = rows
      .slice(1)
      .map(rowToFaq)
      .filter((f): f is FaqItem => f !== null);

    return NextResponse.json(
      { faqs },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/faq] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { faqs: FAQS, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }
}
