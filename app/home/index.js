import { Layout } from 'layouts/default';
import CardGrid from '../../components/home/card-grid';
import { Hero } from '../../components/sections/council';
import { SecondaryFeatures } from '../../components/sections/features';
import s from './home.module.scss';
import TitlesContainer from './titles-container';
import VideoContainer from './video-container';

export default function Home() {
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
