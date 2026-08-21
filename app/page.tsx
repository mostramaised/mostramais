'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/header/Header';
import Ticker from './components/ticker/Ticker';
import { TICKERS } from './components/ticker/data';
import type { TickerData, TickerPage } from './components/ticker/data';
import Hero from './components/hero/Hero';
import Manifesto from './components/manifesto/Manifesto';
import About from './components/about/About';
import { EditionsPage, EditionDetail } from './components/editions';
import { ALL_PROJECTS, EDITIONS } from './components/editions/data';
import type { Edition, EditionBook, EditionProject } from './components/editions/data';
import { SCHEDULE } from './components/schedule/data';
import type { SchedulePhase } from './components/schedule/data';
import { FAQS } from './components/faq/data';
import type { FaqItem } from './components/faq/data';
import Faq from './components/faq/Faq';
import Schedule from './components/schedule/Schedule';
import Contact from './components/contact/Contact';
import { CONTACT_DATA } from './components/contact/data';
import type { ContactData } from './components/contact/data';
import MostraMais from './components/mostra-mais/MostraMais';
import { GALLERY } from './components/mostra-mais/data';
import type { GalleryItem } from './components/mostra-mais/data';
import Footer from './components/footer/Footer';
import type { Route } from './components/header/data';

const VALID_ROUTES: Route[] = ['sobre', 'edicoes', 'cronograma', 'faq', 'contato', 'mais'];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-');
}

function projectSlug(project: EditionProject): string {
  return `${project.id}-${slugify(project.title)}`;
}

function routeFromPathname(pathname: string): { route: Route; project: string | null } {
  const segments = pathname.split('/').filter(Boolean);
  const seg = segments[0] as Route;
  const route = VALID_ROUTES.includes(seg) ? seg : 'sobre';
  const project = route === 'edicoes' && segments[1] ? segments[1] : null;
  return { route, project };
}

export default function Home() {
  const pathname = usePathname();
  const { route, project: selectedProject } = routeFromPathname(pathname);

  const [projects, setProjects] = useState<EditionProject[] | null>(null);
  const effectiveProjects = projects ?? ALL_PROJECTS;

  const [editions, setEditions] = useState<Edition[] | null>(null);
  const effectiveEditions = editions ?? EDITIONS;

  const [books, setBooks] = useState<EditionBook[] | null>(null);
  const effectiveBooks = books ?? [];

  const [schedulePhases, setSchedulePhases] = useState<SchedulePhase[] | null>(null);
  const effectiveSchedule = schedulePhases ?? SCHEDULE;

  const [faqItems, setFaqItems] = useState<FaqItem[] | null>(null);
  const effectiveFaqs = faqItems ?? FAQS;

  const [contactData, setContactData] = useState<ContactData | null>(null);
  const effectiveContactData = contactData ?? CONTACT_DATA;

  const [gallery, setGallery] = useState<GalleryItem[] | null>(null);
  const effectiveGallery = gallery ?? GALLERY;

  const [tickers, setTickers] = useState<Record<TickerPage, TickerData> | null>(null);
  const effectiveTickers = tickers ?? TICKERS;

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { projects: EditionProject[]; editions: Edition[] }) => {
        setProjects(d.projects);
        setEditions(d.editions);
      })
      .catch(() => {});
    fetch('/api/books')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { books: EditionBook[] }) => setBooks(d.books))
      .catch(() => {});
    fetch('/api/schedule')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { phases: SchedulePhase[] }) => setSchedulePhases(d.phases))
      .catch(() => {});
    fetch('/api/faq')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { faqs: FaqItem[] }) => setFaqItems(d.faqs))
      .catch(() => {});
    fetch('/api/contact')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: ContactData) => setContactData(d))
      .catch(() => {});
    fetch('/api/bastidores')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { gallery: GalleryItem[] }) => setGallery(d.gallery))
      .catch(() => {});
    fetch('/api/tickers')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { tickers: Record<TickerPage, TickerData> }) => setTickers(d.tickers))
      .catch(() => {});
  }, []);

  const onNav = (r: Route) => {
    window.history.pushState(null, '', r === 'sobre' ? '/' : `/${r}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openProject = (id: string) => {
    const project = effectiveProjects.find(p => p.id === id);
    const slug = project ? projectSlug(project) : id;
    window.history.pushState(null, '', `/edicoes/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeProject = () => {
    window.history.pushState(null, '', '/edicoes');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="mm-app">
      <Header active={route} onNav={onNav} />

      {route === 'sobre' && (
        <main className="mm-main">
          <Hero onCta={() => onNav('edicoes')} onSchedule={() => onNav('cronograma')} />
          <Ticker {...effectiveTickers.sobre} />
          <About />
          <Manifesto />
        </main>
      )}

      {route === 'edicoes' && (
        <main className="mm-main">
          {selectedProject ? (
            <EditionDetail
              id={effectiveProjects.find(p => projectSlug(p) === selectedProject)?.id ?? selectedProject}
              projects={effectiveProjects}
              onBack={closeProject}
              onOpen={openProject}
            />
          ) : (
            <>
              <EditionsPage projects={effectiveProjects} books={effectiveBooks} editions={effectiveEditions} onOpen={openProject} />
              <Ticker {...effectiveTickers.edicoes} />
            </>
          )}
        </main>
      )}

      {route === 'cronograma' && (
        <main className="mm-main">
          <Schedule phases={effectiveSchedule} />
          <Ticker {...effectiveTickers.cronograma} />
        </main>
      )}

      {route === 'faq' && (
        <main className="mm-main">
          <Faq items={effectiveFaqs} />
          <Ticker {...effectiveTickers.faq} />
        </main>
      )}

      {route === 'contato' && (
        <main className="mm-main">
          <Contact data={effectiveContactData} />
        </main>
      )}

      {route === 'mais' && (
        <main className="mm-main">
          <MostraMais gallery={effectiveGallery} />
        </main>
      )}

      <Footer />
    </div>
  );
}
