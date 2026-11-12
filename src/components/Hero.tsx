import React, { useState } from 'react';
import {
  ArrowRight,
  CheckSquare,
  Square,
  SlidersHorizontal,
  RotateCcw,
  GitMerge,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_DASHBOARD_TASKS } from '../data/flowpilotData';
import {
  toggleTaskCompletion,
  filterTasksByCategory,
  calculateSprintMetrics,
  type DashboardTask,
} from '../utils/flowpilotLogic';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<DashboardTask[]>(INITIAL_DASHBOARD_TASKS);
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'automation' | 'collaboration' | 'analytics'
  >('all');

  const visibleTasks = filterTasksByCategory(tasks, activeCategory);
  const metrics = calculateSprintMetrics(tasks);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) => toggleTaskCompletion(prev, taskId));
  };

  const handleCompleteAllReview = () => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        completed: true,
        status: 'Completed',
      }))
    );
  };

  const handleResetWorkspace = () => {
    setTasks(INITIAL_DASHBOARD_TASKS);
    setActiveCategory('all');
  };

  return (
    <section
      id="home"
      className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/60"
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_55%,transparent_100%)]"
      />

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-stretch">
          {/* Left Column: Value Proposition & Primary Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-blue-700 mb-5">
                <span className="whitespace-nowrap">Enterprise Workflow Orchestration</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="whitespace-nowrap text-slate-600">SOC 2 Type II Certified</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="whitespace-nowrap text-slate-600">GitHub &amp; Linear Sync</span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight text-slate-950 text-balance mb-6"
                style={{ fontSize: 'clamp(2.35rem, 3.9vw, 3.6rem)', lineHeight: 1.08 }}
              >
                Coordinate product releases without status meetings.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[58ch] mb-8">
                FlowPilot connects your code repositories, design specs, and sprint queues into one
                automated workspace. Route pull requests, eliminate cross-team blockers, and
                forecast delivery dates with live engineering telemetry.
              </p>

              {/* Primary and Secondary CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-9">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Request a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('features')}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore Capabilities
                </button>
              </div>

              {/* Quick Feature Assurance Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-8">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Zap className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>5-minute OAuth setup</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <GitMerge className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>2-way PR &amp; issue sync</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>14-day full-feature trial</span>
                </div>
              </div>
            </div>

            {/* Trust & Proof Note */}
            <div className="pt-6 border-t border-slate-200/90">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Trusted by product &amp; platform engineering teams shipping weekly releases
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-display font-bold tracking-tight text-slate-700">
                <span>Vektor Cloud</span>
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
                <span>Kinetix Pay</span>
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
                <span>Northstar Bio</span>
                <span aria-hidden="true" className="text-slate-300">
                  /
                </span>
                <span>Arcline Robotics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Dashboard Illustration */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              data-testid="hero-dashboard-preview"
              className="flex-1 bg-white border border-slate-200/90 rounded-2xl shadow-md flex flex-col justify-between overflow-hidden"
            >
              {/* Workspace Top Chrome */}
              <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-slate-700" aria-hidden="true">
                    |
                  </span>
                  <span className="font-mono text-xs text-blue-400 font-semibold shrink-0">
                    FLOWPILOT
                  </span>
                  <span className="text-slate-600" aria-hidden="true">
                    /
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-100 truncate">
                    Sprint 24 · Checkout v3 Release
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCompleteAllReview}
                    className="px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Auto-Resolve Queue
                  </button>
                  <button
                    type="button"
                    onClick={handleResetWorkspace}
                    aria-label="Reset interactive workspace demo"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Workspace Telemetry Strip + Live Progress Bar */}
              <div className="bg-slate-50/90 border-b border-slate-200">
                <div className="grid grid-cols-3 divide-x divide-slate-200/90">
                  <div className="px-4 py-3">
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Sprint Progress</div>
                    <div className="flex items-baseline gap-2">
                      <span
                        data-testid="sprint-completion-rate"
                        className="font-mono text-lg font-bold text-slate-950 tabular-nums"
                      >
                        {metrics.completionRate}%
                      </span>
                      <span className="text-xs text-slate-500 tabular-nums">
                        ({metrics.completedTasks}/{metrics.totalTasks})
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Mean Cycle Time</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-lg font-bold text-slate-950 tabular-nums">
                        {metrics.avgCycleHours}h
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold">-38%</span>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <div className="text-xs font-medium text-slate-500 mb-0.5">Active Rules</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-lg font-bold text-slate-950 tabular-nums">
                        12
                      </span>
                      <span className="text-xs text-blue-700 font-medium">Synced</span>
                    </div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="h-1.5 w-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-200"
                    style={{ width: `${metrics.completionRate}%` }}
                  />
                </div>
              </div>

              {/* Interactive Filter Controls */}
              <div className="px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-white">
                <div
                  role="group"
                  aria-label="Filter workspace tasks by category"
                  className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
                >
                  {(
                    [
                      { id: 'all', label: 'All Tasks' },
                      { id: 'automation', label: 'Automation' },
                      { id: 'collaboration', label: 'Handoffs' },
                      { id: 'analytics', label: 'Analytics' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        activeCategory === tab.id
                          ? 'bg-white text-slate-950 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
                  <span>Click any row to toggle state</span>
                </div>
              </div>

              {/* Interactive Task Queue Rows */}
              <div className="divide-y divide-slate-100 flex-1 bg-white">
                {visibleTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => handleToggleTask(task.id)}
                    aria-label={`Toggle task ${task.code}: ${task.title}`}
                    className="w-full text-left px-5 py-3 flex items-center justify-between gap-3 hover:bg-blue-50/40 transition-colors cursor-pointer select-none group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 shrink-0">
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-blue-700" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                          <span className="font-mono font-semibold text-slate-800">
                            {task.code}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-slate-700">{task.assignee}</span>
                          <span aria-hidden="true">·</span>
                          <span>{task.role}</span>
                        </div>
                        <p
                          className={`text-sm font-medium truncate ${
                            task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 text-right">
                      <span
                        aria-hidden="true"
                        className="hidden sm:inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-slate-200 font-display text-[10px] font-bold text-slate-700"
                      >
                        {getInitials(task.assignee)}
                      </span>
                      <span
                        className={`text-xs font-semibold whitespace-nowrap w-18 text-right ${
                          task.completed ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {task.status}
                      </span>
                      <span className="font-mono text-xs text-slate-500 tabular-nums w-9 text-right">
                        {task.cycleHours}h
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Workspace Footer Bar */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Webhook pipeline: GitHub · Linear · Slack</span>
                <span className="font-mono tabular-nums text-slate-800 font-semibold">
                  {metrics.completedTasks} of {metrics.totalTasks} verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantified KPI Strip Below Hero Split */}
        <div className="mt-14 pt-10 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white/80 border border-slate-200/80 rounded-xl p-5">
            <div className="font-display text-3xl font-extrabold text-slate-950 tabular-nums mb-1">
              -42%
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">Engineering Cycle Time</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Measured from first commit to production deployment across 140+ squads within 60 days.
            </p>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-xl p-5">
            <div className="font-display text-3xl font-extrabold text-slate-950 tabular-nums mb-1">
              14.5 hrs
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">Saved Per Squad Weekly</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminates manual status collection, ticket routing, and redundant standup check-ins.
            </p>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-xl p-5">
            <div className="font-display text-3xl font-extrabold text-slate-950 tabular-nums mb-1">
              94.2%
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">Sprint Forecast Accuracy</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time capacity and dependency alerts prevent mid-sprint scope surprises.
            </p>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-xl p-5">
            <div className="font-display text-3xl font-extrabold text-slate-950 tabular-nums mb-1">
              &lt; 5 min
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1">Zero-Code Workspace Sync</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant OAuth integration with GitHub, GitLab, Figma, and Slack without custom scripts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
