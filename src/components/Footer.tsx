import React, { useState } from 'react';
import { ArrowUp, Check, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string, topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('solutions@flowpilot.dev').catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    topic?: string
  ) => {
    e.preventDefault();
    onNavigate(sectionId, topic);
  };

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top Enterprise Callout Bar */}
        <div className="py-12 border-b border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight mb-1">
              Ready to streamline your next engineering release?
            </h2>
            <p className="text-sm text-slate-400">
              Start your 14-day full-feature trial or book a live architecture review with our
              solutions team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Compare Plans
            </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-800/90">
          {/* Column 1: Company Info */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="font-display text-xl font-bold tracking-tight text-white inline-block"
            >
              FlowPilot
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Intelligent workflow automation and real-time delivery analytics for high-velocity
              engineering and product teams.
            </p>
            <div className="pt-1 text-xs text-slate-500 space-y-1">
              <div>FlowPilot Technologies Inc.</div>
              <div>548 Market St, Suite 42100 · San Francisco, CA 94104</div>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-xs font-semibold text-white tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features')}
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleLinkClick(e, 'how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleLinkClick(e, 'pricing')}
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Request a Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Platform Modules */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold text-white tracking-wide">
              Platform Modules
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features', 'Workflow Automation')}
                  className="hover:text-white transition-colors"
                >
                  Workflow Automation
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features', 'Team Collaboration')}
                  className="hover:text-white transition-colors"
                >
                  Team Collaboration
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features', 'Project Analytics')}
                  className="hover:text-white transition-colors"
                >
                  Project Analytics &amp; DORA
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features', 'Smart Task Management')}
                  className="hover:text-white transition-colors"
                >
                  Smart Task Management
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-xs font-semibold text-white tracking-wide">
              Contact &amp; Connect
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-mono text-xs">solutions@flowpilot.dev</span>
                  {copiedEmail && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
                {copiedEmail && (
                  <span className="block text-xs text-emerald-400 mt-0.5">
                    Copied email to clipboard
                  </span>
                )}
              </div>
              <div className="font-mono text-xs text-slate-400">+1 (415) 890-4210</div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-4 text-xs font-medium">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                aria-label="Connect via GitHub"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span aria-hidden="true" className="text-slate-700">
                ·
              </span>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                aria-label="Connect via LinkedIn"
                className="text-slate-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true" className="text-slate-700">
                ·
              </span>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                aria-label="Connect via X"
                className="text-slate-400 hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Developer Credit */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>&copy; {new Date().getFullYear()} FlowPilot Technologies Inc. All rights reserved.</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300 font-medium">
              Created by Sankar Group Pvt. Ltd. — Developer Mohan Saini
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
