import { NextResponse } from 'next/server';
import { GALLERY } from '@/app/components/mostra-mais/data';
import type { GalleryItem, GalleryKind } from '@/app/components/mostra-mais/data';

function driveFileId(url: string): string | null {
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return idMatch ? idMatch[1] : null;
}

function normalizeMediaUrl(raw: string, kind: GalleryKind): string {
  const id = driveFileId(raw);
  if (!id) return raw;
  return kind === 'video'
    ? `https://drive.google.com/file/d/${id}/preview`
    : `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
}

function rowToGalleryItem(row: string[]): GalleryItem | null {
  const rawKind = (row[0] ?? '').trim().toLowerCase();
  if (rawKind !== 'image' && rawKind !== 'video' && rawKind !== 'gif') return null;

  const title = (row[1] ?? '').trim();
  const src = (row[3] ?? '').trim();
  if (!title) return null;

  const item: GalleryItem = {
    kind: rawKind,
    title,
    sub: (row[2] ?? '').trim(),
    color: (row[5] ?? '').trim() || '#111',
  };
  const span = (row[6] ?? '').trim();

  if (src) item.src = normalizeMediaUrl(src, rawKind);
  if (row[4]?.trim()) item.poster = normalizeMediaUrl(row[4].trim(), 'image');
  if (span === 'big' || span === 'tall') item.span = span;

  return item;
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/bastidores] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY - using static fallback');
    return NextResponse.json(
      { gallery: GALLERY, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  try {
    const range = encodeURIComponent('bastidores!A1:G');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Sheets API ${res.status}: ${res.statusText}`);

    const data = await res.json() as { values?: string[][] };
    const gallery = (data.values ?? [])
      .slice(1)
      .map(rowToGalleryItem)
      .filter((item): item is GalleryItem => item !== null);

    return NextResponse.json(
      { gallery },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/bastidores] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { gallery: GALLERY, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }
}