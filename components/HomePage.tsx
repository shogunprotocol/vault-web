'use client';

import { Layout } from 'layouts/default';
import CardGrid from './home/card-grid';
import { Hero } from './sections/council';
import { SecondaryFeatures } from './sections/features';
import s from './home-page/home.module.scss';
import TitlesContainer from './home-page/titles-container';
import VideoContainer from './home-page/video-container';

export default function HomePage() {
  return (
    <Layout theme="dark" className={s.home}>
      <div className="relative">
        {/* //video component replace */}
        <div className="video-wrapper font-aeonik">
          <VideoContainer />
          <div className={s.container}>
            <section className={s.content}>
              <TitlesContainer />
            </section>
            <div className={s.cardGridContainer}>
              <CardGrid />
            </div>
          </div>
        </div>
      </div>
      <SecondaryFeatures />
      <Hero />
    </Layout>
  );
} 