import { NextResponse } from 'next/server';
import { SCHEDULE } from '@/app/components/schedule/data';
import type { SchedulePhase, PhaseStatus } from '@/app/components/schedule/data';

function rowToPhase(row: string[]): SchedulePhase | null {
  const phase = (row[0] ?? '').trim();
  const title = (row[2] ?? '').trim();
  if (!phase || !title) return null;

  const rawStatus = (row[4] ?? '').trim().toLowerCase();
  const status: PhaseStatus =
    rawStatus === 'done' ? 'done' :
    rawStatus === 'current' ? 'current' :
    'next';

  return {
    phase,
    date:   (row[1] ?? '').trim(),
    title,
    body:   (row[3] ?? '').trim(),
    status,
    color:  (row[5] ?? '').trim() || 'var(--mm-pink)',
  };
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey  = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/schedule] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY — using static fallback');
    return NextResponse.json(
      { phases: SCHEDULE, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  try {
    const range = encodeURIComponent('cronograma!A1:F');
    const url   = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Sheets API ${res.status}: ${res.statusText}`);
    }

    const data = await res.json() as { values?: string[][] };
    const rows = data.values ?? [];

    const phases: SchedulePhase[] = rows
      .slice(1)
      .map(rowToPhase)
      .filter((p): p is SchedulePhase => p !== null);

    return NextResponse.json(
      { phases },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/schedule] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { phases: SCHEDULE, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }
}
