import React, { useState } from 'react';
import { Destination, Mission } from '../types/mission';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { WorldSelector } from './WorldSelector';
import { MissionTimeline } from './MissionTimeline';
import { ObjectExplorer } from './ObjectExplorer';
import { MapSection } from './MapSection';
import { LastSignalSection } from './LastSignalSection';
import { SignalDelaySection } from './SignalDelaySection';
import { SignalGame } from './SignalGame';
import { MoonArtifactsSection } from './MoonArtifactsSection';
import { TheyRemainGallery } from './TheyRemainGallery';
import { QuizSection } from './QuizSection';
import { FinalSection } from './FinalSection';
import { Footer } from './Footer';
import { MissionModal } from './MissionModal';

/**
 * Chapter order for the atlas. The archive flow moves from territory
 * (worlds) to chronology, then the hardware register, cartography, signal
 * physics, heritage and finally the learning layer.
 */
export const ArchiveApp: React.FC = () => {
  const [activeWorld, setActiveWorld] = useState<Destination>('Mars');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const scrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--void)] font-sans text-[color:var(--ink)]">
      <Navbar activeWorld={activeWorld} onWorldChange={setActiveWorld} />

      <main className="flex-1 xl:ps-[76px]">
        <Hero
          activeWorld={activeWorld}
          onExploreClick={scrollToExplorer}
          onWorldChange={setActiveWorld}
        />

        <WorldSelector selectedWorld={activeWorld} onSelectWorld={setActiveWorld} />

        <MissionTimeline selectedWorld={activeWorld} onSelectMission={setSelectedMission} />

        <ObjectExplorer
          activeWorld={activeWorld}
          onSelectWorld={setActiveWorld}
          onOpenDetail={setSelectedMission}
        />

        <MapSection
          activeWorld={activeWorld}
          onSelectWorld={setActiveWorld}
          onSelectMission={setSelectedMission}
        />

        <LastSignalSection />

        <SignalDelaySection />

        <SignalGame />

        <MoonArtifactsSection />

        <TheyRemainGallery />

        <QuizSection />

        <FinalSection />
      </main>

      <div className="xl:ps-[76px]">
        <Footer />
      </div>

      <MissionModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
    </div>
  );
};

export default ArchiveApp;