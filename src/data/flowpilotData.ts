import type { DashboardTask, PricingTier } from '../utils/flowpilotLogic';

export interface FeatureItem {
  id: string;
  index: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  mechanism: string;
  measurableOutcome: string;
  metricValue: string;
  metricLabel: string;
  colSpan: 'wide' | 'normal';
  highlights: string[];
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  durationLabel: string;
  triggerExample: string;
  actionExample: string;
  resultMetric: string;
}

export interface ProofCaseStudy {
  company: string;
  industry: string;
  teamSize: string;
  headlineMetric: string;
  metricContext: string;
  beforeState: string;
  afterOutcome: string;
}

export const INITIAL_DASHBOARD_TASKS: DashboardTask[] = [
  {
    id: 'task-1',
    code: 'FP-408',
    title: 'Route staging build approvals to release engineering channel',
    assignee: 'Maya Lin',
    role: 'Release Lead',
    status: 'Completed',
    cycleHours: 1.4,
    category: 'automation',
    completed: true,
  },
  {
    id: 'task-2',
    code: 'FP-412',
    title: 'Resolve cross-team API schema dependency for Checkout v3',
    assignee: 'Devon Brooks',
    role: 'Staff Backend',
    status: 'Completed',
    cycleHours: 2.8,
    category: 'collaboration',
    completed: true,
  },
  {
    id: 'task-3',
    code: 'FP-415',
    title: 'Publish weekly sprint cycle-time variance breakdown for Q4',
    assignee: 'Ananya Rao',
    role: 'Eng Operations',
    status: 'Completed',
    cycleHours: 1.9,
    category: 'analytics',
    completed: true,
  },
  {
    id: 'task-4',
    code: 'FP-419',
    title: 'Auto-triage high-priority customer regressions into current sprint',
    assignee: 'Lucas Meyer',
    role: 'Product Manager',
    status: 'In Review',
    cycleHours: 3.1,
    category: 'automation',
    completed: false,
  },
  {
    id: 'task-5',
    code: 'FP-422',
    title: 'Align design handoff specs with frontend component checklist',
    assignee: 'Sora Takahashi',
    role: 'Design Systems',
    status: 'In Review',
    cycleHours: 2.3,
    category: 'collaboration',
    completed: false,
  },
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    id: 'workflow-automation',
    index: '01',
    title: 'Workflow Automation',
    category: 'Deterministic Routing Engine',
    readTime: 'Zero-code rules',
    summary:
      'Eliminate manual ticket triage and repetitive status pings by connecting Git commits, pull requests, and design updates directly to task transitions.',
    mechanism:
      'Event-driven triggers listen to GitHub, GitLab, Figma, and Slack webhooks to assign reviewers, update sprint states, and notify downstream owners automatically.',
    measurableOutcome: 'Saves 6.4 hours per engineer every week on manual status administration.',
    metricValue: '-68%',
    metricLabel: 'Manual Triage Overhead',
    colSpan: 'wide',
    highlights: [
      'Conditional multi-branch routing rules with instant dry-run testing',
      'Automatic SLA escalation before sprint blockers stall releases',
      'Bi-directional state sync with GitHub PRs and incident queues',
    ],
  },
  {
    id: 'team-collaboration',
    index: '02',
    title: 'Team Collaboration',
    category: 'Cross-Functional Handoffs',
    readTime: 'Real-time context',
    summary:
      'Keep product managers, designers, and engineers aligned in shared release rooms where specs, threads, and blockers live alongside active work.',
    mechanism:
      'Inline decision logs and threaded handoff checklists attach directly to sprint milestones so context never fragments across chat channels.',
    measurableOutcome: 'Cuts cross-team handoff delays from 2.5 days down to under 4 hours.',
    metricValue: '3.2x',
    metricLabel: 'Faster Spec-to-PR Handoff',
    colSpan: 'normal',
    highlights: [
      'Threaded decision history anchored to live deliverables',
      'Async daily standup digests compiled from real commit activity',
      'Role-based review queues for Design, QA, and Security sign-off',
    ],
  },
  {
    id: 'project-analytics',
    index: '03',
    title: 'Project Analytics',
    category: 'Delivery Telemetry',
    readTime: 'Live DORA metrics',
    summary:
      'Spot delivery bottlenecks before they slip your release date with real-time cycle time distributions, scope creep alerts, and capacity forecasting.',
    mechanism:
      'Automatically measures time-in-state across coding, code review, QA staging, and production deployment without manual time tracking.',
    measurableOutcome: 'Improves sprint commitment accuracy from 61% to 94% within two quarters.',
    metricValue: '94%',
    metricLabel: 'Sprint Forecast Accuracy',
    colSpan: 'normal',
    highlights: [
      'Stage-by-stage cycle time breakdown (Coding vs. Review vs. QA)',
      'Instant scope-change impact simulations on target launch dates',
      'Exportable executive board reports in CSV and structured PDF',
    ],
  },
  {
    id: 'smart-task-management',
    index: '04',
    title: 'Smart Task Management',
    category: 'Dependency-Aware Planning',
    readTime: 'Keyboard-first speed',
    summary:
      'Prioritize high-leverage work using dependency graphs, workload balancing, and keyboard-first command palettes built for high-velocity teams.',
    mechanism:
      'Visualizes upstream and downstream task dependencies across squads and flags overloaded contributors before sprint kickoff.',
    measurableOutcome: 'Reduces mid-sprint blocked tickets by 54% across multi-squad initiatives.',
    metricValue: '-54%',
    metricLabel: 'Mid-Sprint Blocked Tasks',
    colSpan: 'wide',
    highlights: [
      'Sub-50ms keyboard command bar for instant task creation and filtering',
      'Cross-squad dependency mapping with critical-path highlighting',
      'Automated carry-over cleanup and capacity-balanced sprint templates',
    ],
  },
];

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Connect Your Stack & Import Active Sprints',
    subtitle: 'One-click synchronization in under 5 minutes',
    description:
      'Link your code repositories, design files, and team channels. FlowPilot maps existing issues, labels, and contributor permissions into a clean workspace structure without disrupting ongoing work.',
    durationLabel: 'Setup time: ~4 mins',
    triggerExample: 'OAuth connection to GitHub, GitLab, Jira, or Linear importer',
    actionExample: 'Maps 100% of active epics, open pull requests, and squad assignments',
    resultMetric: 'Zero downtime migration with full historical audit trail',
  },
  {
    stepNumber: '02',
    title: 'Configure Automated Handoff & Triage Rules',
    subtitle: 'Replace repetitive check-ins with deterministic workflows',
    description:
      'Select from proven engineering and product playbooks or compose custom IF/THEN routing rules. When a pull request passes CI or a design spec is approved, FlowPilot advances the task and notifies the next owner.',
    durationLabel: 'Configuration: ~10 mins',
    triggerExample: 'IF Pull Request merged to main AND QA checklist verified',
    actionExample: 'THEN transition task to Staged, update release notes, and notify QA Lead',
    resultMetric: '14.5 hours saved weekly per 10-person engineering squad',
  },
  {
    stepNumber: '03',
    title: 'Monitor Cycle Time & Ship On Schedule',
    subtitle: 'Continuous visibility across every product initiative',
    description:
      'Track live sprint velocity, review queue bottlenecks, and milestone health from a single command view. Leaders get accurate delivery forecasts while makers stay focused in deep work.',
    durationLabel: 'Continuous real-time telemetry',
    triggerExample: 'Live aggregation of PR review latency and sprint burndown velocity',
    actionExample: 'Flags review bottlenecks > 18h and re-balances reviewer load',
    resultMetric: '42% faster end-to-end feature cycle time in 60 days',
  },
];

export const PROOF_CASE_STUDIES: ProofCaseStudy[] = [
  {
    company: 'Vektor Cloud Systems',
    industry: 'Distributed Infrastructure',
    teamSize: '140 Engineers',
    headlineMetric: '-42% Cycle Time',
    metricContext: 'Measured across 18 product squads over 6 months',
    beforeState: 'Release coordination required 9 weekly status meetings and manual spreadsheet tracking.',
    afterOutcome: 'Automated PR-to-release pipelines cut average feature delivery from 11.4 days to 6.6 days.',
  },
  {
    company: 'Kinetix Financial',
    industry: 'Payment Operations',
    teamSize: '85 Product & Eng',
    headlineMetric: '14.5 hrs Saved / Wk',
    metricContext: 'Per engineering manager and tech lead',
    beforeState: 'Cross-team API blockers routinely stalled mobile and web checkout releases.',
    afterOutcome: 'Dependency-aware sprint boards eliminated 78% of late-stage integration surprises.',
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    audience: 'For early-stage startups & focused product squads',
    description:
      'Essential workflow automation, dependency-aware task boards, and core sprint analytics to get your team shipping predictably.',
    monthlyPrice: 19,
    annualPricePerMonth: 15,
    seatLimit: 'Up to 15 team members',
    automationRuns: '2,500 automated rule runs / mo',
    retentionHistory: '90-day analytics & audit history',
    slaSupport: 'Standard email support (< 24h response)',
    highlighted: false,
    ctaLabel: 'Start with Starter',
    capabilities: [
      'Unlimited projects, sprints, and task boards',
      'GitHub, GitLab, and Slack native two-way sync',
      'Up to 15 active multi-step workflow automation rules',
      'Core sprint burndown & velocity telemetry',
      'Guest collaborator access with view/comment permissions',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    audience: 'For scaling engineering & cross-functional organizations',
    description:
      'Full-scale workflow orchestration, unlimited custom automations, DORA cycle-time telemetry, and cross-squad dependency mapping.',
    monthlyPrice: 49,
    annualPricePerMonth: 39,
    seatLimit: 'Unlimited team members',
    automationRuns: '50,000 automated rule runs / mo',
    retentionHistory: 'Unlimited historical telemetry & exports',
    slaSupport: 'Priority 4-hour SLA & dedicated onboarding',
    highlighted: true,
    ctaLabel: 'Select Professional Plan',
    capabilities: [
      'Everything in Starter, plus unlimited active automation rules',
      'Cross-squad dependency graphs & critical-path alerts',
      'Full DORA metrics & stage-by-stage cycle time analytics',
      'Custom webhook triggers, REST API, and Figma integration',
      'Role-based access control (RBAC) & SAML Single Sign-On',
      'Automated executive sprint digests & CSV/PDF report exports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'For multi-region enterprises with custom governance needs',
    description:
      'Dedicated cloud isolation, custom compliance auditing, unlimited automation throughput, and a named solutions architect.',
    monthlyPrice: 89,
    annualPricePerMonth: 72,
    seatLimit: 'Unlimited seats + multi-org workspaces',
    automationRuns: 'Unlimited automated rule executions',
    retentionHistory: '7-year immutable compliance audit logs',
    slaSupport: '99.99% uptime SLA & 1-hour critical response',
    highlighted: false,
    ctaLabel: 'Request Enterprise Demo',
    capabilities: [
      'Everything in Professional with unlimited automation volume',
      'SCIM directory provisioning & custom data residency (US/EU/IN)',
      'Custom BI data warehouse connector (Snowflake, BigQuery)',
      'Dedicated Solutions Architect & custom migration engineering',
      'Security review package, SOC 2 Type II & ISO 27001 reports',
    ],
  },
];

export const ASSETS = {
  studioCollaboration: '/src/assets/images/team_collaboration_studio_1794491757955.jpg',
  vpEngineeringAvatar: '/src/assets/images/avatar_vp_engineering_1794491758124.jpg',
};
