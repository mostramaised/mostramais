import { NextResponse } from 'next/server';
import { CONTACT_DATA } from '@/app/components/contact/data';
import type { ContactChannel, ContactData, ContactLink, ContactSocial } from '@/app/components/contact/data';

function rowToContact(row: string[], data: ContactData): void {
  const type = (row[0] ?? '').trim().toLowerCase();
  const label = (row[1] ?? '').trim();
  const value = (row[2] ?? '').trim();
  const href = (row[3] ?? '').trim();
  const meta = (row[4] ?? '').trim();
  const color = (row[5] ?? '').trim() || 'var(--mm-pink)';

  if (type === 'channel' && label && value && href) {
    data.channels.push({ label, value, href } satisfies ContactChannel);
  } else if (type === 'social' && label && value && href) {
    data.social.push({ name: label, handle: value, href, color } satisfies ContactSocial);
  } else if (type === 'link' && label && href) {
    data.links.push({ label, meta, href } satisfies ContactLink);
  } else if (type === 'address' && value) {
    data.address.push(value);
  }
}

export async function GET() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    console.warn('[/api/contact] Missing GOOGLE_SHEETS_ID or GOOGLE_API_KEY - using static fallback');
    return NextResponse.json(
      { ...CONTACT_DATA, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }

  try {
    const range = encodeURIComponent('contato!A1:F');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error(`Sheets API ${res.status}: ${res.statusText}`);
    }

    const data = await res.json() as { values?: string[][] };
    const contact: ContactData = {
      channels: [],
      social: [],
      links: [],
      address: [],
    };

    (data.values ?? []).slice(1).forEach(row => rowToContact(row, contact));

    return NextResponse.json(
      contact,
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    );
  } catch (err) {
    console.error('[/api/contact] fetch failed, falling back to static data:', err);
    return NextResponse.json(
      { ...CONTACT_DATA, fallback: true },
      { headers: { 'Cache-Control': 'no-store', 'X-Data-Source': 'static-fallback' } }
    );
  }
}