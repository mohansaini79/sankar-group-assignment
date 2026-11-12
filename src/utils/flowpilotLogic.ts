export interface ContactFormInput {
  name: string;
  email: string;
  company: string;
  message: string;
  planInterest?: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

export interface DashboardTask {
  id: string;
  code: string;
  title: string;
  assignee: string;
  role: string;
  status: 'Completed' | 'In Review' | 'Automated' | 'Queued';
  cycleHours: number;
  category: 'automation' | 'collaboration' | 'analytics';
  completed: boolean;
}

export interface PricingTier {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  audience: string;
  description: string;
  monthlyPrice: number;
  annualPricePerMonth: number;
  seatLimit: string;
  automationRuns: string;
  retentionHistory: string;
  slaSupport: string;
  highlighted?: boolean;
  ctaLabel: string;
  capabilities: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the Contact / Demo Request form fields strictly without fallback substitution.
 */
export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: ContactFormErrors = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedCompany = input.company.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Work email address is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address (e.g. alex@company.com).';
  }

  if (!trimmedCompany) {
    errors.company = 'Company or organization name is required.';
  } else if (trimmedCompany.length < 2) {
    errors.company = 'Company name must be at least 2 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please describe your team workflow or demo goals.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates the effective per-seat monthly price and annual savings for a pricing tier.
 */
export function calculatePlanPrice(
  tier: Pick<PricingTier, 'monthlyPrice' | 'annualPricePerMonth'>,
  billingCycle: 'monthly' | 'annual',
  teamSeats: number = 1
): {
  activePerSeatPrice: number;
  monthlyTotal: number;
  annualSavingsTotal: number;
} {
  const normalizedSeats = Math.max(1, Math.floor(teamSeats));
  const activePerSeatPrice =
    billingCycle === 'annual' ? tier.annualPricePerMonth : tier.monthlyPrice;
  const monthlyTotal = activePerSeatPrice * normalizedSeats;
  const annualSavingsPerSeat = (tier.monthlyPrice - tier.annualPricePerMonth) * 12;
  const annualSavingsTotal =
    billingCycle === 'annual' ? annualSavingsPerSeat * normalizedSeats : 0;

  return {
    activePerSeatPrice,
    monthlyTotal,
    annualSavingsTotal,
  };
}

/**
 * Toggles the completion status of a task in the interactive Hero Workspace preview.
 */
export function toggleTaskCompletion(
  tasks: DashboardTask[],
  taskId: string
): DashboardTask[] {
  return tasks.map((task) => {
    if (task.id !== taskId) return task;
    const nextCompleted = !task.completed;
    return {
      ...task,
      completed: nextCompleted,
      status: nextCompleted ? 'Completed' : 'In Review',
    };
  });
}

/**
 * Filters tasks in the live dashboard preview by category or returns all tasks.
 */
export function filterTasksByCategory(
  tasks: DashboardTask[],
  category: 'all' | 'automation' | 'collaboration' | 'analytics'
): DashboardTask[] {
  if (category === 'all') return tasks;
  return tasks.filter((task) => task.category === category);
}

/**
 * Computes live sprint telemetry from the current task list.
 */
export function calculateSprintMetrics(tasks: DashboardTask[]): {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgCycleHours: number;
  automatedCount: number;
} {
  const totalTasks = tasks.length;
  if (totalTasks === 0) {
    return {
      totalTasks: 0,
      completedTasks: 0,
      completionRate: 0,
      avgCycleHours: 0,
      automatedCount: 0,
    };
  }

  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const totalCycle = tasks.reduce((sum, t) => sum + t.cycleHours, 0);
  const avgCycleHours = Number((totalCycle / totalTasks).toFixed(1));
  const automatedCount = tasks.filter(
    (t) => t.status === 'Automated' || t.category === 'automation'
  ).length;

  return {
    totalTasks,
    completedTasks,
    completionRate,
    avgCycleHours,
    automatedCount,
  };
}

/**
 * Generates a deterministic reference code for a submitted demo request.
 */
export function createSubmissionReference(company: string, email: string): string {
  const cleanPrefix = company
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 4)
    .padEnd(4, 'X');
  const charSum = (company + email)
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const numericCode = String((charSum % 9000) + 1000);
  return `FP-${cleanPrefix}-${numericCode}`;
}

/**
 * Determines whether an IntersectionObserver entry should mark a section as revealed.
 */
export function shouldTriggerReveal(
  entry: { isIntersecting: boolean; intersectionRatio: number },
  alreadyRevealed: boolean,
  minRatio: number = 0.08
): boolean {
  if (alreadyRevealed) return true;
  return entry.isIntersecting || entry.intersectionRatio >= minRatio;
}

/**
 * Returns compositor-only Tailwind CSS classes for scroll-reveal animations.
 */
export function getRevealClasses(isVisible: boolean): string {
  const baseTransition =
    'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]';
  const stateClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-6';
  return `${baseTransition} ${stateClasses}`;
}

