'use client';

import { useState } from 'react';
import { EDITIONS, DEFAULT_EDITION, type EditionProject } from './data';

function ColorCover({ title, accent, bg, style }: { title: string; accent: string; bg: string; style?: React.CSSProperties }) {
  const word = title.split(' ')[0].toUpperCase();
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...style }}>
      <span className="mm-past-cover-w" style={{ color: '#fff', mixBlendMode: 'multiply' }}>{word}</span>
      <span className="mm-past-cover-w b" style={{ color: accent, mixBlendMode: 'multiply', position: 'absolute' }}>{word}</span>
    </div>
  );
}

function EditionGridCard({ p, i, onOpen }: { p: EditionProject; i: number; onOpen: (id: string) => void }) {
  return (
    <article
      className="mm-pjcard"
      style={{ '--acc': p.accent } as React.CSSProperties}
      onClick={() => onOpen(p.id)}
    >
      <div className="mm-pjcard-cover">
        {p.coverImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.coverImg} alt="" />
        ) : (
          <ColorCover title={p.title} accent={p.accent} bg={p.bg} />
        )}
        <div className="mm-pjcard-tag">+ {p.tag}</div>
        <div className="mm-pjcard-num">0{i + 1}</div>
      </div>
      <div className="mm-pjcard-body">
        <div className="mm-pjcard-cat" style={{ color: p.accent }}>+ {p.area}</div>
        <h3 className="mm-pjcard-title">{p.title}</h3>
        <div className="mm-pjcard-meta">
          <span>{p.author}</span>
          <span>{p.year}</span>
        </div>
        <p className="mm-pjcard-desc">{p.short}</p>
        <div className="mm-pjcard-cta">Ver projeto <span className="arr">→</span></div>
      </div>
    </article>
  );
}

function EditionListCard({ p, onOpen }: { p: EditionProject; onOpen: (id: string) => void }) {
  return (
    <article
      className="mm-past-card"
      style={{ '--lift': p.accent } as React.CSSProperties}
      onClick={() => onOpen(p.id)}
    >
      <button className="mm-past-head" onClick={(e) => { e.preventDefault(); onOpen(p.id); }}>
        <div className="mm-past-cover" style={{ background: p.bg, overflow: 'hidden' }}>
          {p.coverImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.coverImg}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}
            />
          ) : null}
          </div>
        <div className="mm-past-info">
          <div className="mm-past-ed">Edição {p.edition} · {p.year}</div>
          <div className="mm-past-cat" style={{ color: p.accent }}>+ {p.area} · {p.tag}</div>
          <h4 className="mm-past-title">{p.title}</h4>
          <div className="mm-past-author">{p.author}</div>
        </div>
        <div className="mm-past-toggle" aria-hidden>→</div>
      </button>
    </article>
  );
}

export default function EditionsPage({ onOpen, projects }: { onOpen: (id: string) => void; projects: EditionProject[] }) {
  const [ed, setEd] = useState(DEFAULT_EDITION);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = projects.filter(p => p.edition === ed);
  const edMeta = EDITIONS.find(e => e.id === ed);

  return (
    <>
      <section className="mm-past" id="editions">
        <header className="mm-section-head">
          <div className="mm-eyebrow">+ Edições</div>
          <h2 className="mm-section-title">Tudo o que passou pela MOSTRA<span style={{ color: 'var(--mm-pink)' }}>+</span>.</h2>
          <p className="mm-section-lead">Escolha uma edição e explore os projetos em grade ou lista.</p>
        </header>

        <div className="mm-projetos-toolbar">
          <div className="mm-pgrid-filters">
            {EDITIONS.map(e => (
              <button
                key={e.id}
                className={`mm-filter ${ed === e.id ? 'on' : ''}`}
                onClick={() => { setEd(e.id); setView('grid'); }}
              >
                Ed. {e.id}
              </button>
            ))}
          </div>
          <div className="mm-projetos-viewswitch" role="tablist" aria-label="View mode">
            <button className={`mm-vs ${view === 'grid' ? 'on' : ''}`} onClick={() => setView('grid')}>+ Grade</button>
            <button className={`mm-vs ${view === 'list' ? 'on' : ''}`} onClick={() => setView('list')}>+ Lista</button>
          </div>
        </div>

        {filtered.length > 0 ? (
          view === 'grid' ? (
            <div className="mm-projetos-grid">
              {filtered.map((p, i) => <EditionGridCard key={p.id} p={p} i={i} onOpen={onOpen} />)}
            </div>
          ) : (
            <div className="mm-past-list mm-past-list--projetos">
              {filtered.map(p => <EditionListCard key={p.id} p={p} onOpen={onOpen} />)}
            </div>
          )
        ) : (
          <div style={{ padding: '80px 0', textAlign: 'center', fontFamily: 'var(--font-body-wide)', fontSize: 14, letterSpacing: '0.1em', color: '#888' }}>
            EDIÇÃO {ed} · {edMeta?.year} — ACERVO EM DIGITALIZAÇÃO
          </div>
        )}
      </section>

      {/* <section className="mm-livro" id="book">
        <div className="mm-livro-inner">
          <div className="mm-livro-book" aria-hidden>
            <div className="mm-livro-spine"></div>
            <div className="mm-livro-cover">
              <div className="mm-livro-cover-eye">+ EDIÇÃO 01</div>
              <div className="mm-livro-cover-title">MOSTRA<span>+</span></div>
              <div className="mm-livro-cover-year">2025</div>
            </div>
          </div>
          <div className="mm-livro-copy">
            <div className="mm-eyebrow mm-eyebrow--white">+ Livro da edição</div>
            <h3 className="mm-livro-title">O livro da 01ª edição já está disponível.</h3>
            <p className="mm-livro-lead">192 páginas, 42 projetos, 4 áreas. Impresso em papel pólen e offset 2 cores, com ensaios curatoriais e registros fotográficos da montagem.</p>
            <div className="mm-livro-cta">
              <button className="mm-btn mm-btn--pink">Baixar PDF (22 MB)</button>
              <button className="mm-btn mm-btn--ghost mm-btn--on-dark">Ver online →</button>
            </div>
            <div className="mm-livro-meta">ISBN 978-65-00-00000-0 · Editora Par(ent)êntese · BH, 2025</div>
          </div>
        </div>
      </section> */}
    </>
  );
}
