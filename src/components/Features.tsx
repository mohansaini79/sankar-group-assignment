import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  GitPullRequest,
  Users,
  BarChart3,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CORE_FEATURES, type FeatureItem } from '../data/flowpilotData';
import { RevealOnScroll } from './RevealOnScroll';

interface FeaturesProps {
  onNavigate: (sectionId: string, featureTopic?: string) => void;
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  'workflow-automation': <GitPullRequest className="w-5 h-5" />,
  'team-collaboration': <Users className="w-5 h-5" />,
  'project-analytics': <BarChart3 className="w-5 h-5" />,
  'smart-task-management': <Layers className="w-5 h-5" />,
};

const STAGGER_DELAYS: Array<0 | 75 | 150 | 225> = [0, 75, 150, 225];

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(CORE_FEATURES[0].id);

  const activeFeature: FeatureItem =
    CORE_FEATURES.find((f) => f.id === selectedFeatureId) || CORE_FEATURES[0];

  const renderFeatureDiagram = (featureId: string, isSelected: boolean) => {
    const surfaceClass = isSelected
      ? 'bg-slate-900/90 border-slate-800 text-slate-200'
      : 'bg-white border-slate-200/90 text-slate-700';

    if (featureId === 'workflow-automation') {
      return (
        <div className={`rounded-lg border p-3.5 mb-5 text-xs ${surfaceClass}`}>
          <div className="flex items-center justify-between gap-2 font-mono text-[11px] mb-2">
            <span className={isSelected ? 'text-blue-400' : 'text-blue-700'}>
              RULE · PR_MERGED_PIPELINE
            </span>
            <span className={isSelected ? 'text-emerald-400' : 'text-emerald-700'}>
              Execution: 42ms
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div
              className={`p-2 rounded border ${
                isSelected ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] opacity-70">WHEN</div>
              <div className="font-semibold truncate">GitHub PR #418 Merged</div>
            </div>
            <div
              className={`p-2 rounded border ${
                isSelected ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] opacity-70">IF CONDITION</div>
              <div className="font-semibold truncate">CI Suite &amp; Security Pass</div>
            </div>
            <div
              className={`p-2 rounded border ${
                isSelected ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] opacity-70">THEN ACTION</div>
              <div className="font-semibold truncate">Move to Staged &amp; Notify QA</div>
            </div>
          </div>
        </div>
      );
    }

    if (featureId === 'team-collaboration') {
      return (
        <div className={`rounded-lg border p-3.5 mb-5 text-xs space-y-2 ${surfaceClass}`}>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className={isSelected ? 'text-blue-400' : 'text-blue-700'}>
              RELEASE ROOM · CHECKOUT V3
            </span>
            <span>3/3 Sign-offs</span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <span>Design Spec v2.4 · Sora T.</span>
            <span className="font-mono text-[11px] text-emerald-500 font-semibold">Approved</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>API Contract · Devon B.</span>
            <span className="font-mono text-[11px] text-emerald-500 font-semibold">Verified</span>
          </div>
        </div>
      );
    }

    if (featureId === 'project-analytics') {
      return (
        <div className={`rounded-lg border p-3.5 mb-5 text-xs space-y-2 ${surfaceClass}`}>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className={isSelected ? 'text-blue-400' : 'text-blue-700'}>
              STAGE CYCLE DISTRIBUTION
            </span>
            <span className="tabular-nums">Total: 7.5h</span>
          </div>
          <div className="space-y-1.5 pt-1">
            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span>Coding &amp; Unit Tests</span>
                <span className="font-mono tabular-nums">4.2h (56%)</span>
              </div>
              <div className="h-1.5 w-full rounded bg-slate-200/40 overflow-hidden">
                <div className="h-full bg-blue-600 w-[56%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-0.5">
                <span>Peer Code Review &amp; QA</span>
                <span className="font-mono tabular-nums">3.3h (44%)</span>
              </div>
              <div className="h-1.5 w-full rounded bg-slate-200/40 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[44%]" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`rounded-lg border p-3.5 mb-5 text-xs ${surfaceClass}`}>
        <div className="flex items-center justify-between font-mono text-[11px] mb-2">
          <span className={isSelected ? 'text-blue-400' : 'text-blue-700'}>
            DEPENDENCY GRAPH · CRITICAL PATH
          </span>
          <span>Zero Blockers</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            className={`p-2 rounded border ${
              isSelected ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="font-mono font-semibold">FP-408 Auth Token</span>
            <span className="block text-[11px] opacity-75">Unblocks 4 downstream tasks</span>
          </div>
          <div
            className={`p-2 rounded border ${
              isSelected ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="font-mono font-semibold">Workload Balance</span>
            <span className="block text-[11px] opacity-75">92% optimal squad capacity</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-3">
                <span>Core Capabilities</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-500 font-medium">
                  Built for Product &amp; Engineering Teams
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance mb-4">
                Four foundational modules that keep complex projects moving.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Instead of stitching together disconnected task boards, chat reminders, and
                spreadsheet reports, FlowPilot unifies execution and analytics in one high-speed
                interface.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contact', activeFeature.title)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-[#F8FAFC] border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Book Full Platform Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Asymmetric Bento Grid (Responsive at md: and lg: breakpoints) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {CORE_FEATURES.map((feature, index) => {
            const isSelected = feature.id === selectedFeatureId;
            const colSpanClass =
              feature.colSpan === 'wide' ? 'md:col-span-7' : 'md:col-span-5';
            const staggerDelay = STAGGER_DELAYS[index % STAGGER_DELAYS.length];

            return (
              <RevealOnScroll
                key={feature.id}
                delayMs={staggerDelay}
                className={`${colSpanClass} flex`}
              >
                <article
                  onClick={() => setSelectedFeatureId(feature.id)}
                  className={`w-full rounded-2xl border p-7 flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-900 shadow-md'
                      : 'bg-[#F8FAFC] text-slate-900 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  <div>
                    {/* Clean Unboxed Metadata Line */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div
                        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        <span className="font-mono font-bold text-blue-500">{feature.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{feature.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{feature.readTime}</span>
                      </div>

                      <span
                        className={`p-2.5 rounded-xl shrink-0 ${
                          isSelected
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                            : 'bg-white text-blue-700 border border-slate-200/90'
                        }`}
                      >
                        {FEATURE_ICONS[feature.id]}
                      </span>
                    </div>

                    {/* Feature Title & Summary */}
                    <h3
                      className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                        isSelected ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {feature.index}. {feature.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed mb-5 ${
                        isSelected ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {feature.summary}
                    </p>

                    {/* Interactive Mini-UI Diagram for Each Module */}
                    {renderFeatureDiagram(feature.id, isSelected)}

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 mb-6">
                      {feature.highlights.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            isSelected ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isSelected ? 'text-blue-400' : 'text-blue-700'
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Quantified Outcome & Interactive Selector Button */}
                  <div
                    className={`pt-5 border-t flex items-center justify-between gap-4 ${
                      isSelected ? 'border-slate-800' : 'border-slate-200/80'
                    }`}
                  >
                    <div>
                      <div
                        className={`font-mono text-2xl font-bold tabular-nums ${
                          isSelected ? 'text-blue-400' : 'text-slate-950'
                        }`}
                      >
                        {feature.metricValue}
                      </div>
                      <div
                        className={`text-xs ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {feature.metricLabel}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeatureId(feature.id);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white hover:bg-blue-500'
                          : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{isSelected ? 'Inspecting Module' : 'Inspect Mechanism'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Interactive Mechanism-to-Outcome Inspector Bar */}
        <RevealOnScroll delayMs={150}>
          <div
            data-testid="feature-mechanism-inspector"
            className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <span className="font-mono">ACTIVE MODULE ARCHITECTURE</span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeFeature.index}. {activeFeature.title}
                </span>
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                How {activeFeature.title} Works Under the Hood
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Mechanism:</strong>{' '}
                {activeFeature.mechanism}{' '}
                <strong className="text-emerald-400 font-semibold">Verified Outcome:</strong>{' '}
                {activeFeature.measurableOutcome}
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contact', activeFeature.title)}
                className="px-5 py-3 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request {activeFeature.title} Demo
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

