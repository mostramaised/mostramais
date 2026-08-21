import { GALLERY, INTEREST_FORM_HREF, MOSTRA_MAIS_CONTENT } from './data';
import type { GalleryItem } from './data';

const MEDIA_LABELS: Record<string, string> = { image: '⌂ Foto', video: '▶ Vídeo', gif: '∞ GIF' };

function GalleryMedia({ item }: { item: GalleryItem }) {
  if (!item.src) return null;

  if (item.kind === 'video') {
    if (item.src.includes('drive.google.com/file/')) {
      return <iframe className="mm-gal-media" src={item.src} title={item.title} allow="autoplay; fullscreen" />;
    }
    return <video className="mm-gal-media" src={item.src} poster={item.poster} controls preload="metadata" />;
  }

  {/* eslint-disable-next-line @next/next/no-img-element */}
  return <img className="mm-gal-media" src={item.src} alt={item.title} />;
}

export default function MostraMais({ gallery = GALLERY }: { gallery?: GalleryItem[] }) {
  return (
    <>
      <section className="mm-more" id="mostra-mais">
        <header className="mm-section-head">
          <div className="mm-eyebrow">+ Mostra + um pouco</div>
          <h2 className="mm-section-title">Uma amostra a mais.</h2>
          <p className="mm-section-lead">{MOSTRA_MAIS_CONTENT.lead}</p>
        </header>

        <div className="mm-more-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="mm-more-form" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="mm-eyebrow mm-eyebrow--pink">+ Formulário de interesse</div>
            <div className="mm-more-form-row">
              <h3 className="mm-more-h" style={{ margin: 0 }}>Entre na lista.</h3>
              <a
                className="mm-btn mm-btn--pink"
                href={INTEREST_FORM_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero participar →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mm-gal" id="galeria">
        <header className="mm-section-head">
          <div className="mm-eyebrow">+ Galeria</div>
          <h2 className="mm-section-title">Bastidores recentes.</h2>
          <p className="mm-section-lead">{MOSTRA_MAIS_CONTENT.galleryLead}</p>
        </header>
        <div className="mm-gal-grid">
          {gallery.map((g, i) => (
            <figure key={i} className={`mm-gal-tile mm-gal-tile--${g.span || 'std'}`} style={{ background: g.color }}>
              <GalleryMedia item={g} />
              <span className="mm-gal-badge">{MEDIA_LABELS[g.kind]}</span>
              <figcaption>
                <div className="mm-gal-title">{g.title}</div>
                <div className="mm-gal-sub">{g.sub}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
