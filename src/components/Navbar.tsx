import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-8 px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          FlowPilot
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-slate-950 border-blue-700 font-semibold'
                    : 'text-slate-600 border-transparent hover:text-slate-950 hover:border-slate-300'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 active:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Get Started
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg"
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors text-center cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
