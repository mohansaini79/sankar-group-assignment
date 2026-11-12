import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '../data/flowpilotData';
import { calculatePlanPrice } from '../utils/flowpilotLogic';
import { RevealOnScroll } from './RevealOnScroll';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

const PRICING_DELAYS: Array<0 | 75 | 150> = [0, 75, 150];

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [teamSeats, setTeamSeats] = useState<number>(12);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header + Interactive Billing Cadence & Team Size Controls */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-3">
                <span>Transparent Pricing</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-500 font-medium">
                  14-Day Full-Feature Trial on All Plans
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance mb-4">
                Predictable plans that scale with your engineering velocity.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Start free with your core squad or deploy across your entire organization. Every
                plan includes unlimited read-only stakeholder seats and zero per-automation overage
                fees.
              </p>
            </div>

            {/* Interactive Billing Cadence Segmented Control */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <div
                role="group"
                aria-label="Select billing cadence"
                className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-white text-slate-950 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Annual Billing · Save 20%
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Interactive Team Size Estimator Bar */}
        <RevealOnScroll delayMs={75}>
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <label
                htmlFor="team-size-slider"
                className="text-sm font-semibold text-slate-900 whitespace-nowrap"
              >
                Estimate for team size:{' '}
                <span className="font-mono text-blue-700 font-bold tabular-nums">
                  {teamSeats} seats
                </span>
              </label>
              <input
                id="team-size-slider"
                type="range"
                min={5}
                max={100}
                step={1}
                value={teamSeats}
                onChange={(e) => setTeamSeats(Number(e.target.value))}
                className="w-full sm:w-60 accent-blue-700 cursor-pointer"
              />
            </div>

            <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Estimated engineering time saved:{' '}
                <strong className="font-mono text-slate-950 font-bold tabular-nums">
                  {Math.round(teamSeats * 1.45)} hrs/week
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>Free stakeholder viewers included</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier, index) => {
            const pricing = calculatePlanPrice(tier, billingCycle, teamSeats);
            const isHighlighted = Boolean(tier.highlighted);
            const delayMs = PRICING_DELAYS[index % PRICING_DELAYS.length];

            return (
              <RevealOnScroll key={tier.id} delayMs={delayMs} className="flex">
                <div
                  data-testid={`pricing-card-${tier.id}`}
                  className={`w-full rounded-2xl border p-7 flex flex-col justify-between transition-all ${
                    isHighlighted
                      ? 'bg-slate-950 text-white border-slate-900 ring-1 ring-blue-500/30 shadow-md'
                      : 'bg-[#F8FAFC] text-slate-900 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Tier Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3
                        className={`font-display text-2xl font-bold ${
                          isHighlighted ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {tier.name}
                      </h3>
                      {isHighlighted && (
                        <span className="text-xs font-mono font-bold text-blue-400">
                          RECOMMENDED
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-xs font-medium mb-4 ${
                        isHighlighted ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {tier.audience}
                    </p>

                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isHighlighted ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {tier.description}
                    </p>

                    {/* Price Figure */}
                    <div
                      className={`pb-6 mb-6 border-b ${
                        isHighlighted ? 'border-slate-800' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span
                          data-testid={`price-amount-${tier.id}`}
                          className={`font-mono text-4xl font-bold tabular-nums ${
                            isHighlighted ? 'text-white' : 'text-slate-950'
                          }`}
                        >
                          ${pricing.activePerSeatPrice}
                        </span>
                        <span
                          className={`text-xs ${
                            isHighlighted ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          / user / month
                        </span>
                      </div>

                      <div
                        className={`text-xs font-mono tabular-nums ${
                          isHighlighted ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        Est. ${pricing.monthlyTotal.toLocaleString()}/mo for {teamSeats} members
                        {billingCycle === 'annual' && pricing.annualSavingsTotal > 0 && (
                          <span
                            className={`block mt-1 font-semibold ${
                              isHighlighted ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                          >
                            Saves ${pricing.annualSavingsTotal.toLocaleString()}/yr on annual
                            billing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Concrete Limits Matrix */}
                    <div
                      className={`space-y-2.5 text-xs mb-6 pb-6 border-b ${
                        isHighlighted
                          ? 'border-slate-800 text-slate-300'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex justify-between gap-2">
                        <span>Capacity:</span>
                        <span className="font-medium text-right">{tier.seatLimit}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Automation throughput:</span>
                        <span className="font-mono font-medium text-right tabular-nums">
                          {tier.automationRuns}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Telemetry retention:</span>
                        <span className="font-medium text-right">{tier.retentionHistory}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span>Support SLA:</span>
                        <span className="font-medium text-right">{tier.slaSupport}</span>
                      </div>
                    </div>

                    {/* Capabilities Checklist */}
                    <ul className="space-y-2.5 mb-8">
                      {tier.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            isHighlighted ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isHighlighted ? 'text-blue-400' : 'text-blue-700'
                            }`}
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() =>
                      onSelectPlan(`${tier.name} Plan ($${pricing.activePerSeatPrice}/seat)`)
                    }
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isHighlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

