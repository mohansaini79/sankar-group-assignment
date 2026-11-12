import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const SECTION_IDS = ['home', 'features', 'how-it-works', 'pricing', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedPlanContext, setSelectedPlanContext] = useState<string>(
    'Professional Plan ($39/seat)'
  );

  const handleNavigate = useCallback((sectionId: string, topicOrPlan?: string) => {
    if (topicOrPlan) {
      setSelectedPlanContext(topicOrPlan);
    }
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectPlan = useCallback(
    (planLabel: string) => {
      handleNavigate('contact', planLabel);
    },
    [handleNavigate]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1">
        <Hero onNavigate={handleNavigate} />
        <Features onNavigate={handleNavigate} />
        <HowItWorks onNavigate={handleNavigate} />
        <Pricing onSelectPlan={handleSelectPlan} />
        <ContactSection selectedPlanContext={selectedPlanContext} />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
