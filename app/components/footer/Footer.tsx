import Image from 'next/image';
import { FOOTER_CONTENT } from './data';

function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}</>;
}

export default function Footer() {
  return (
    <footer className="mm-footer">
      <div className="mm-footer-top">
        <div className="mm-footer-mark">
          <Image src="/assets/logo_branca.png" alt="MOSTRA+" width={360} height={120} style={{ width: 'clamp(200px, 22vw, 360px)', height: 'auto' }} />
        </div>
        <div className="mm-footer-cols">
          <div>
            <div className="mm-eyebrow mm-eyebrow--white">+ Local</div>
            <p><Lines lines={FOOTER_CONTENT.address} /></p>
          </div>
          <div>
            <div className="mm-eyebrow mm-eyebrow--white">+ Contato</div>
            <p>
              <span>{FOOTER_CONTENT.contact[0]}<br /></span>
              <a href={FOOTER_CONTENT.instagramHref} target="_blank" rel="noopener noreferrer">
                {FOOTER_CONTENT.contact[1]}
              </a>
            </p>
          </div>
          <div>
            <div className="mm-eyebrow mm-eyebrow--white">+ Realização</div>
            <p><Lines lines={FOOTER_CONTENT.credits} /></p>
          </div>
        </div>
      </div>
      <div className="mm-footer-rule"></div>
      <div className="mm-footer-bottom">
        <span>{FOOTER_CONTENT.copyright}</span>
        <span>{FOOTER_CONTENT.edition}</span>
      </div>
    </footer>
  );
}
