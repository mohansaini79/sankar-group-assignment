import React, { useState } from 'react';
import { ArrowRight, Terminal, Workflow, Gauge, CheckCircle2 } from 'lucide-react';
import {
  HOW_IT_WORKS_STEPS,
  PROOF_CASE_STUDIES,
  ASSETS,
} from '../data/flowpilotData';
import { RevealOnScroll } from './RevealOnScroll';

interface HowItWorksProps {
  onNavigate: (sectionId: string) => void;
}

const STEP_DELAYS: Array<0 | 75 | 150> = [0, 75, 150];

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [studioImgError, setStudioImgError] = useState(false);
  const [avatarImgError, setAvatarImgError] = useState(false);

  const currentStep = HOW_IT_WORKS_STEPS[activeStepIndex] || HOW_IT_WORKS_STEPS[0];

  const stepIcons = [
    <Terminal key="01" className="w-5 h-5" />,
    <Workflow key="02" className="w-5 h-5" />,
    <Gauge key="03" className="w-5 h-5" />,
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Heading */}
        <RevealOnScroll>
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-3">
              <span>How FlowPilot Works</span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span className="text-slate-500 font-medium">
                From Repository Connection to Automated Delivery
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance mb-4">
              Up and running across your engineering organization in three steps.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              FlowPilot layers cleanly over your existing repositories and design tools so squads
              can adopt automated routing without halting active sprint commitments.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3-Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isActive = index === activeStepIndex;
            const delayMs = STEP_DELAYS[index % STEP_DELAYS.length];
            return (
              <RevealOnScroll key={step.stepNumber} delayMs={delayMs} className="flex">
                <article
                  onClick={() => setActiveStepIndex(index)}
                  className={`w-full rounded-2xl border p-7 flex flex-col justify-between transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white border-blue-600 ring-1 ring-blue-600/20 shadow-sm'
                      : 'bg-white/80 border-slate-200/90 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span className="font-mono font-bold text-blue-700">
                          STEP {step.stepNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{step.durationLabel}</span>
                      </div>
                      <span
                        className={`p-2.5 rounded-xl ${
                          isActive
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {stepIcons[index]}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-950 mb-2">
                      {step.stepNumber}. {step.title}
                    </h3>

                    <p className="text-xs font-semibold text-blue-700 mb-3">{step.subtitle}</p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Pipeline Blueprint */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                    <div className="text-slate-600">
                      <span className="font-mono font-semibold text-slate-900">INPUT: </span>
                      {step.triggerExample}
                    </div>
                    <div className="text-slate-600">
                      <span className="font-mono font-semibold text-blue-700">OUTPUT: </span>
                      {step.resultMetric}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Interactive Step Pipeline Visualizer */}
        <RevealOnScroll delayMs={150}>
          <div className="bg-slate-950 text-white rounded-2xl p-6 lg:p-8 mb-20 border border-slate-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-mono mb-1">
                  <span>LIVE EXECUTION WALKTHROUGH</span>
                  <span aria-hidden="true">·</span>
                  <span>STEP {currentStep.stepNumber} OF 03</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {currentStep.stepNumber}. {currentStep.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {HOW_IT_WORKS_STEPS.map((step, idx) => (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      idx === activeStepIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Step {step.stepNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="font-mono text-xs text-slate-400 mb-1.5">01. EVENT TRIGGER</div>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {currentStep.triggerExample}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="font-mono text-xs text-blue-400 mb-1.5">02. AUTOMATED ACTION</div>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {currentStep.actionExample}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="font-mono text-xs text-emerald-400 mb-1.5">
                  03. MEASURED OUTCOME
                </div>
                <p className="text-sm font-medium text-slate-100 leading-relaxed">
                  {currentStep.resultMetric}
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Proof of Impact & Editorial Studio Case Study */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Studio Visual + Attributable Executive Testimonial */}
          <RevealOnScroll className="md:col-span-7 flex">
            <div className="w-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
              <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
                {!studioImgError ? (
                  <img
                    src={ASSETS.studioCollaboration}
                    alt="Engineering squad reviewing FlowPilot architecture in studio"
                    referrerPolicy="no-referrer"
                    onError={() => setStudioImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-300 p-6 text-sm">
                    FlowPilot Engineering Release Room
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="text-xs font-medium text-slate-300 mb-1">
                      Customer Spotlight · Vektor Cloud Systems · 140 Engineers
                    </div>
                    <p className="font-display text-lg sm:text-xl font-bold">
                      How Vektor Cloud cut feature release cycle time by 42% in two quarters.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  &ldquo;Before FlowPilot, our 18 engineering squads spent Monday mornings manually
                  reconciling Jira tickets with GitHub pull requests. Within three weeks of turning
                  on FlowPilot&rsquo;s automated routing rules, our PR review wait time dropped by
                  half and we eliminated nine recurring status meetings.&rdquo;
                </blockquote>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      {!avatarImgError ? (
                        <img
                          src={ASSETS.vpEngineeringAvatar}
                          alt="Nadia Vance, VP of Engineering at Vektor Cloud Systems"
                          referrerPolicy="no-referrer"
                          onError={() => setAvatarImgError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs text-slate-700">
                          NV
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-slate-950">
                        Nadia Vance
                      </div>
                      <div className="text-xs text-slate-500">
                        VP of Engineering · Vektor Cloud Systems
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Book Architecture Walkthrough</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Quantified Case Study Cards */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            {PROOF_CASE_STUDIES.map((study, idx) => (
              <RevealOnScroll
                key={study.company}
                delayMs={idx === 0 ? 75 : 150}
                className="flex-1 flex"
              >
                <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-3">
                      <span className="font-bold text-slate-900">{study.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.industry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{study.teamSize}</span>
                    </div>

                    <div className="font-mono text-3xl font-bold text-blue-700 tabular-nums mb-1">
                      {study.headlineMetric}
                    </div>
                    <div className="text-xs text-slate-500 mb-4">{study.metricContext}</div>

                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                      <p>
                        <strong className="text-slate-900 font-semibold">Before: </strong>
                        {study.beforeState}
                      </p>
                      <p>
                        <strong className="text-slate-900 font-semibold">Outcome: </strong>
                        {study.afterOutcome}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Verified production telemetry</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

