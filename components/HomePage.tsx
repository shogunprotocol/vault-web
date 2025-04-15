'use client';

import { Layout } from '@/layouts/default';
import CardGrid from '@/components/home/card-grid';
// import { Hero } from '@/components/sections/council';
import { SecondaryFeatures } from '@/components/sections/features';
import s from '@/components/home-page/home.module.scss';
import TitlesContainer from '@/components/home-page/titles-container';
import VideoContainer from '@/components/home-page/video-container';

export default function HomePage() {
  return (
    <Layout theme="dark" className={s.home}>
      <div className="relative">
        {/* Video background first */}
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
      
      {/* Secondary features should come before Hero/Council section */}
      <SecondaryFeatures />

    </Layout>
  );
} 