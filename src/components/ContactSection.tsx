import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Send, RotateCcw, Mail, MapPin, Clock } from 'lucide-react';
import {
  validateContactForm,
  createSubmissionReference,
  type ContactFormErrors,
} from '../utils/flowpilotLogic';
import { RevealOnScroll } from './RevealOnScroll';

interface ContactSectionProps {
  selectedPlanContext: string;
}

interface SubmittedRecord {
  referenceId: string;
  name: string;
  email: string;
  company: string;
  planInterest: string;
  message: string;
  submittedAt: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedPlanContext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [planInterest, setPlanInterest] = useState('Professional Plan ($39/seat)');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedData, setSubmittedData] = useState<SubmittedRecord | null>(null);

  useEffect(() => {
    if (selectedPlanContext) {
      setPlanInterest(selectedPlanContext);
    }
  }, [selectedPlanContext]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateContactForm({
      name,
      email,
      company,
      message,
      planInterest,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const refId = createSubmissionReference(company.trim(), email.trim());
    setSubmittedData({
      referenceId: refId,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      planInterest,
      message: message.trim(),
      submittedAt: 'Confirmed · Solutions Engineering Queue',
    });
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
  };

  const handleQuickFillSample = () => {
    setName('Priya Nair');
    setEmail('priya.nair@vektorcloud.io');
    setCompany('Vektor Cloud Systems');
    setMessage(
      'We are evaluating FlowPilot to automate sprint handoffs and track release cycle times across our 25-person frontend and platform engineering team.'
    );
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Demo Expectations & Direct Contact Details */}
          <RevealOnScroll className="md:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-3">
                <span>Request a Personalized Demo</span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="text-slate-500 font-medium">Direct Solutions Engineering</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 text-balance mb-4">
                See FlowPilot configured for your team&rsquo;s workflow.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Share a few details about your engineering or product organization. Our solutions
                architects will prepare a tailored sandbox demonstrating automated routing and cycle
                time telemetry for your stack.
              </p>
            </div>

            {/* What to Expect List */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-display text-base font-bold text-slate-950">
                What happens after you submit
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-blue-700 mt-0.5">01.</span>
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      Custom Sandbox Provisioning:
                    </strong>{' '}
                    We pre-load sample workflow rules matching your Git and issue tracker setup.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-blue-700 mt-0.5">02.</span>
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      30-Minute Live Architecture Review:
                    </strong>{' '}
                    Walk through sprint automation, DORA analytics, and security permissions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-blue-700 mt-0.5">03.</span>
                  <span>
                    <strong className="text-slate-900 font-semibold">
                      14-Day Guided Pilot Trial:
                    </strong>{' '}
                    Import one live squad project with dedicated Slack support from our engineers.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Metadata */}
            <div className="space-y-3 text-sm text-slate-600 pt-2">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Enterprise &amp; Demo Inquiries: solutions@flowpilot.dev</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Response SLA: Under 2 business hours (Mon–Fri)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
                <span>San Francisco · Bengaluru · Munich</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Interactive Form or Validated Success State */}
          <RevealOnScroll delayMs={150} className="md:col-span-7">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-9 shadow-sm">
              {submittedData ? (
                <div
                  data-testid="contact-success-confirmation"
                  role="status"
                  aria-live="polite"
                  className="space-y-6"
                >
                  <div className="flex items-start gap-4 pb-6 border-b border-slate-200">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold mb-1">
                        <span>DEMO REQUEST CONFIRMED</span>
                        <span aria-hidden="true">·</span>
                        <span>REF {submittedData.referenceId}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-slate-950 mb-1">
                        Thank you, {submittedData.name}.
                      </h3>
                      <p className="text-sm text-slate-600">
                        We have registered your demo request for{' '}
                        <strong className="text-slate-900 font-semibold">
                          {submittedData.company}
                        </strong>{' '}
                        and sent a calendar invitation link to{' '}
                        <span className="font-mono text-slate-800">{submittedData.email}</span>.
                      </p>
                    </div>
                  </div>

                  {/* Summary of Submitted Payload */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Booking Reference:</span>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">
                        {submittedData.referenceId}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Organization:</span>
                      <span className="font-medium text-slate-900">{submittedData.company}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Selected Tier / Focus:</span>
                      <span className="font-semibold text-blue-700">
                        {submittedData.planInterest}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-slate-500 block mb-1">Workflow Notes:</span>
                      <p className="text-slate-800 leading-relaxed">{submittedData.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-slate-500">{submittedData.submittedAt}</span>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Request</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-950">
                        Schedule Your Live Walkthrough
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        All fields marked with * are required.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleQuickFillSample}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4 cursor-pointer"
                    >
                      Fill sample evaluation data
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Priya Nair"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 transition-colors ${
                          errors.name ? 'border-red-600 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="e.g. priya@vektorcloud.io"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 transition-colors ${
                          errors.email ? 'border-red-600 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company Field */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Company Name *
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company)
                            setErrors((prev) => ({ ...prev, company: undefined }));
                        }}
                        placeholder="e.g. Vektor Cloud Systems"
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? 'contact-company-error' : undefined}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 transition-colors ${
                          errors.company ? 'border-red-600 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.company && (
                        <p
                          id="contact-company-error"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.company}</span>
                        </p>
                      )}
                    </div>

                    {/* Plan / Topic Interest Select */}
                    <div>
                      <label
                        htmlFor="contact-plan"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Plan or Module of Interest
                      </label>
                      <select
                        id="contact-plan"
                        name="planInterest"
                        value={planInterest}
                        onChange={(e) => setPlanInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 transition-colors"
                      >
                        <option value="Starter Plan ($15/seat)">Starter Plan ($15/seat)</option>
                        <option value="Professional Plan ($39/seat)">
                          Professional Plan ($39/seat)
                        </option>
                        <option value="Enterprise Plan ($72/seat)">
                          Enterprise Plan ($72/seat)
                        </option>
                        <option value="Workflow Automation">Module: Workflow Automation</option>
                        <option value="Team Collaboration">Module: Team Collaboration</option>
                        <option value="Project Analytics">Module: Project Analytics</option>
                        <option value="Smart Task Management">
                          Module: Smart Task Management
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                    >
                      Project Goals &amp; Workflow Details *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Tell us about your team size, current tools (e.g. GitHub, Jira, Linear), and what workflows you want to automate..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-1 focus:outline-blue-700 transition-colors ${
                        errors.message ? 'border-red-600 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Protected by strict enterprise privacy. No spam or automated cold calls.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                    >
                      <span>Request Demo &amp; Sandbox</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
