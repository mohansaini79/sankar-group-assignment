import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  calculatePlanPrice,
  toggleTaskCompletion,
  filterTasksByCategory,
  calculateSprintMetrics,
  createSubmissionReference,
  shouldTriggerReveal,
  getRevealClasses,
  type DashboardTask,
} from './flowpilotLogic';

test('validateContactForm rejects empty fields with clear error messages', () => {
  const result = validateContactForm({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.company);
  assert.ok(result.errors.message);
});

test('validateContactForm rejects invalid email format and short messages', () => {
  const result = validateContactForm({
    name: 'Priya Nair',
    email: 'priya-at-company',
    company: 'Vektor Cloud',
    message: 'Too short',
  });
  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, undefined);
  assert.equal(result.errors.company, undefined);
  assert.ok(result.errors.email?.includes('valid email'));
  assert.ok(result.errors.message?.includes('at least 10 characters'));
});

test('validateContactForm accepts valid complete submission', () => {
  const result = validateContactForm({
    name: 'Priya Nair',
    email: 'priya.nair@vektorcloud.io',
    company: 'Vektor Cloud',
    message: 'We want to automate sprint handoffs for our 35-person product team.',
  });
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('calculatePlanPrice computes monthly and annual rates accurately', () => {
  const proTier = { monthlyPrice: 49, annualPricePerMonth: 39 };

  const monthly = calculatePlanPrice(proTier, 'monthly', 10);
  assert.equal(monthly.activePerSeatPrice, 49);
  assert.equal(monthly.monthlyTotal, 490);
  assert.equal(monthly.annualSavingsTotal, 0);

  const annual = calculatePlanPrice(proTier, 'annual', 10);
  assert.equal(annual.activePerSeatPrice, 39);
  assert.equal(annual.monthlyTotal, 390);
  assert.equal(annual.annualSavingsTotal, 1200);
});

test('toggleTaskCompletion and calculateSprintMetrics update task telemetry', () => {
  const sampleTasks: DashboardTask[] = [
    {
      id: 't1',
      code: 'FP-101',
      title: 'Auto-assign PR reviewers from CODEOWNERS',
      assignee: 'Arjun M.',
      role: 'Platform Eng',
      status: 'Completed',
      cycleHours: 2.0,
      category: 'automation',
      completed: true,
    },
    {
      id: 't2',
      code: 'FP-102',
      title: 'Sync Q4 release blockers with product roadmap',
      assignee: 'Elena R.',
      role: 'Product Lead',
      status: 'In Review',
      cycleHours: 4.0,
      category: 'collaboration',
      completed: false,
    },
  ];

  const initialMetrics = calculateSprintMetrics(sampleTasks);
  assert.equal(initialMetrics.totalTasks, 2);
  assert.equal(initialMetrics.completedTasks, 1);
  assert.equal(initialMetrics.completionRate, 50);
  assert.equal(initialMetrics.avgCycleHours, 3.0);

  const updatedTasks = toggleTaskCompletion(sampleTasks, 't2');
  const updatedMetrics = calculateSprintMetrics(updatedTasks);
  assert.equal(updatedMetrics.completedTasks, 2);
  assert.equal(updatedMetrics.completionRate, 100);

  const filtered = filterTasksByCategory(updatedTasks, 'automation');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 't1');
});

test('createSubmissionReference returns deterministic formatted ID', () => {
  const ref1 = createSubmissionReference('Vektor Cloud', 'test@vektor.io');
  const ref2 = createSubmissionReference('Vektor Cloud', 'test@vektor.io');
  assert.equal(ref1, ref2);
  assert.ok(ref1.startsWith('FP-VEKT-'));
});

test('shouldTriggerReveal and getRevealClasses handle intersection states', () => {
  assert.equal(
    shouldTriggerReveal({ isIntersecting: false, intersectionRatio: 0 }, false),
    false
  );
  assert.equal(
    shouldTriggerReveal({ isIntersecting: true, intersectionRatio: 0.15 }, false),
    true
  );
  assert.equal(
    shouldTriggerReveal({ isIntersecting: false, intersectionRatio: 0 }, true),
    true
  );

  const hiddenClasses = getRevealClasses(false);
  assert.ok(hiddenClasses.includes('opacity-0'));
  assert.ok(hiddenClasses.includes('translate-y-6'));

  const visibleClasses = getRevealClasses(true);
  assert.ok(visibleClasses.includes('opacity-100'));
  assert.ok(visibleClasses.includes('translate-y-0'));
});

