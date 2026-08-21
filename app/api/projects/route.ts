import { NextResponse } from 'next/server';
import { ALL_PROJECTS, EDITIONS } from '@/app/components/editions/data';
import type { Edition, EditionProject, EditionMedia } from '@/app/components/editions/data';

const AREA_COLORS: Record<string, { accent: string; bg: string }> = {
  'gráfico':   { accent: '#ed3e8c', bg: '#f9a52b' },
  'produto':   { accent: '#f9a52b', bg: '#3056a6' },
  'moda':      { accent: '#ed3e8c', bg: '#E72818' },
  'ambientes': { accent: '#3056a6', bg: '#2D155B' },
};
const DEFAULT_COLORS = { accent: '#ed3e8c', bg: '#111' };

function driveFileId(url: string): string | null {
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

function driveFolderId(url: string): string | null {
  const m = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

function isDriveFolder(url: string): boolean {
  return !!driveFolderId(url);
}

function driveImageUrl(raw: string): string | null {
  if (isDriveFolder(raw)) return null; // folders can't be used as images
  const id = driveFileId(raw);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200` : raw;
}

function driveVideoEmbedUrl(raw: string): string {
  const id = driveFileId(raw);
  return id ? `https://drive.google.com/file/d/${id}/preview` : raw;
}

function isDrive(url: string): boolean {
  return url.includes('drive.google.com');
}

function normalizeImageUrl(raw: string): string | null {
  return isDrive(raw) ? driveImageUrl(raw) : raw;
}

function normalizeVideoUrl(raw: string): string {
  return isDrive(raw) ? driveVideoEmbedUrl(raw) : raw;
}

function parseMedia(row: string[]): EditionMedia[] {
  const media: EditionMedia[] = [];
  const MEDIA_START = 11;
  const SLOT_WIDTH = 4;
  const MAX_SLOTS = 8;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const base = MEDIA_START + i * SLOT_WIDTH;
    const kind = (row[base] ?? '').trim().toLowerCase();
    if (!kind) break;

    const src     = (row[base + 1] ?? '').trim();
    const extra   = (row[base + 2] ?? '').trim();
    const caption = (row[base + 3] ?? '').trim();

    if (kind === 'image') {
      const normalized = normalizeImageUrl(src);
      if (normalized) media.push({ kind: 'image', src: normalized, caption });
    } else if (kind === 'video') {
      const entry: EditionMedia = { kind: 'video', src: normalizeVideoUrl(src), caption };
      if (extra) {
        const poster = normalizeImageUrl(extra);
        if (poster) (entry as { kind: 'video'; src: string; poster?: string; caption: string }).poster = poster;
      }
      media.push(entry);
    } else if (kind === 'block') {
      media.push({ kind: 'block', label: caption, color: extra || '#000' });
    } else if (kind === 'pdf') {
      media.push({ kind: 'pdf', src, caption });
    }
  }

  return media;
}

function rowToProject(row: string[]): EditionProject | null {
  const id = (row[0] ?? '').trim();
  const title = (row[3] ?? '').trim();
  if (!id || !title) return null;

  const area   = (row[5] ?? '').trim();
  const colors = AREA_COLORS[area.toLowerCase()] ?? DEFAULT_COLORS;
  const coverRaw = (row[10] ?? '').trim();
  const coverImg = coverRaw ? normalizeImageUrl(coverRaw) : null;
  const media  = parseMedia(row);

  return {
    id,
    edition:  (row[1] ?? '').trim(),
    year:     (row[2] ?? '').trim(),
    title:    (row[3] ?? '').trim(),
    author:   (row[4] ?? '').trim(),
    area,
    tag:      (row[6] ?? '').trim(),
    accent:   colors.accent,
    bg:       colors.bg,
    short:    (row[7] ?? '').trim(),
    desc:     (row[8] ?? '').trim(),
    advisor:  (row[9] ?? '').trim() || undefined,
    ...(coverImg && { coverImg }),
    media,
  };
}

function rowToEdition(row: string[]): Edition | null {
  const id = (row[0] ?? '').trim();
  if (!id) return null;
  return { id, year: (row[1] ?? '').trim() };
}

/**
 * Lê a aba `edicoes`. A ordem das linhas é a ordem dos filtros na página,
 * e a primeira linha é a edição aberta por padrão.
 */
async function fetchEditions(sheetId: string, apiKey: string): Promise<Edition[]> {
  try {
    const range = encodeURIComponent('edicoes!A1:B');
    const url   = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Sheets API ${res.status}: ${res.statusText}`);
    }

    const data = await res.json() as { values?: string[][] };
    const editions = (data.values ?? [])
      .slice(1)
      .map(rowToEdition)
      .filter((e): e is Edition => e !== null);

    return editions.length > 0 ? editions : EDITIONS;
  } catch (err) {
    console.error('[/api/projects] tab "edicoes" failed, using static fallback:', err);
    return EDITIONS;
  }
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey  = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/projects] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY — using static fallback');
    return NextResponse.json(
      { projects: ALL_PROJECTS, editions: EDITIONS, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  // As duas abas são lidas em paralelo e falham de forma independente:
  // um problema em `edicoes` não derruba os projetos, e vice-versa.
  const editionsPromise = fetchEditions(sheetId, apiKey);

  try {
    const range = encodeURIComponent('projects!A1:AQ');
    const url   = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Sheets API ${res.status}: ${res.statusText}`);
    }

    const data = await res.json() as { values?: string[][] };
    const rows = data.values ?? [];

    // rows[0] is the header row — skip it
    const projects: EditionProject[] = rows
      .slice(1)
      .map(rowToProject)
      .filter((p): p is EditionProject => p !== null);

    return NextResponse.json(
      { projects, editions: await editionsPromise },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/projects] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { projects: ALL_PROJECTS, editions: await editionsPromise, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }
}
