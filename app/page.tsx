'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/header/Header';
import Ticker from './components/Ticker';
import Hero from './components/hero/Hero';
import Manifesto from './components/manifesto/Manifesto';
import About from './components/about/About';
import { EditionsPage, EditionDetail } from './components/editions';
import { ALL_PROJECTS } from './components/editions/data';
import type { EditionProject } from './components/editions/data';
import { SCHEDULE } from './components/schedule/data';
import type { SchedulePhase } from './components/schedule/data';
import { FAQS } from './components/faq/data';
import type { FaqItem } from './components/faq/data';
import Faq from './components/faq/Faq';
import Schedule from './components/schedule/Schedule';
import Contact from './components/contact/Contact';
import MostraMais from './components/mostra-mais/MostraMais';
import Footer from './components/footer/Footer';
import type { Route } from './components/header/data';

const VALID_ROUTES: Route[] = ['sobre', 'edicoes', 'cronograma', 'faq', 'contato', 'mais'];

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

  const [schedulePhases, setSchedulePhases] = useState<SchedulePhase[] | null>(null);
  const effectiveSchedule = schedulePhases ?? SCHEDULE;

  const [faqItems, setFaqItems] = useState<FaqItem[] | null>(null);
  const effectiveFaqs = faqItems ?? FAQS;

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { projects: EditionProject[] }) => setProjects(d.projects))
      .catch(() => {});
    fetch('/api/schedule')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { phases: SchedulePhase[] }) => setSchedulePhases(d.phases))
      .catch(() => {});
    fetch('/api/faq')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((d: { faqs: FaqItem[] }) => setFaqItems(d.faqs))
      .catch(() => {});
  }, []);

  const onNav = (r: Route) => {
    window.history.pushState(null, '', r === 'sobre' ? '/' : `/${r}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openProject = (id: string) => {
    window.history.pushState(null, '', `/edicoes/${id}`);
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
          <Ticker color="orange" items={['02ª EDIÇÃO', '05 MAI — 22 MAI', 'ESCOLA DE DESIGN | UEMG', 'ECED · AUDITÓRIO DA ED', 'INSCRIÇÕES ENCERRADAS']} />
          <About />
          <Manifesto />
        </main>
      )}

      {route === 'edicoes' && (
        <main className="mm-main">
          {selectedProject ? (
            <EditionDetail id={selectedProject} projects={effectiveProjects} onBack={closeProject} onOpen={openProject} />
          ) : (
            <>
              <EditionsPage projects={effectiveProjects} onOpen={openProject} />
              <Ticker color="pink" items={['ACERVO ABERTO', '06 EDIÇÕES', '240+ PROJETOS', 'GRÁFICO · PRODUTO · MODA · AMBIENTES']} />
            </>
          )}
        </main>
      )}

      {route === 'cronograma' && (
        <main className="mm-main">
          <Schedule phases={effectiveSchedule} />
          <Ticker color="blue" items={['EDITAL 02', 'INSCRIÇÕES ATÉ 15/03', 'RESULTADO 30/03', 'ABERTURA 05/05']} />
        </main>
      )}

      {route === 'faq' && (
        <main className="mm-main">
          <Faq items={effectiveFaqs} />
          <Ticker color="orange" items={['AINDA COM DÚVIDAS?', 'ESCREVE PARA MOSTRAMAIS.ED@GMAIL.COM', 'OU NOS CHAME NO INSTAGRAM', '@MOSTRAMAIS.ED']} />
        </main>
      )}

      {route === 'contato' && (
        <main className="mm-main">
          <Contact />
        </main>
      )}

      {route === 'mais' && (
        <main className="mm-main">
          <MostraMais />
        </main>
      )}

      <Footer />
    </div>
  );
}
