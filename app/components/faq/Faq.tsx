'use client';

import { useState } from 'react';
import type { FaqItem } from './data';
import { FAQS } from './data';

interface FaqProps {
  items?: FaqItem[];
}

export default function Faq({ items = FAQS }: FaqProps) {
  const [open, setOpen] = useState(0);

  return (
    <section className="mm-faq" id="faq">
      <header className="mm-section-head">
        <div className="mm-eyebrow">+ FAQ</div>
        <h2 className="mm-section-title">Perguntas frequentes.</h2>
        <p className="mm-section-lead">Dúvidas sobre inscrição, curadoria e exposição. Se a sua não estiver aqui, fale com a gente.</p>
      </header>
      <ul className="mm-faq-list">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className={`mm-faq-item ${isOpen ? 'open' : ''}`}>
              <button
                className="mm-faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="mm-faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mm-faq-text">{f.q}</span>
                <span className="mm-faq-plus" aria-hidden>{isOpen ? '−' : '+'}</span>
              </button>
              <div className="mm-faq-a" role="region" aria-hidden={!isOpen}>
                <p>{f.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
