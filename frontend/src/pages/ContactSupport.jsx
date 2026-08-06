import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function ContactSupport() {
  const inputClass = 'app-input px-4 py-3';

  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
            <div className="mb-10 rounded-[2rem] bg-gradient-to-r from-indigo-700 to-blue-600 p-10 text-white shadow-2xl shadow-blue-500/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Contact Support</p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight">We’re here to help.</h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                    Use this page to review support channels, check FAQs, and send a request when you need assistance.
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <section className="space-y-6 rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-primary">Support Overview</h2>
                  <p className="text-sm leading-7 text-secondary">
                    We provide fast, friendly support for DecisionHub users. Review the available contact options below,
                    and use the form to send a message when you need personalized help.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Email</p>
                    <p className="mt-3 text-sm font-semibold text-primary">support@decisionhub.app</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Send questions about accounts, features, and feedback.</p>
                  </div>
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Phone</p>
                    <p className="mt-3 text-sm font-semibold text-primary">+1 (555) 123-4567</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Available Monday–Friday, 9AM–6PM.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-default bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Need faster support?</p>
                  <p className="mt-3 text-sm leading-7 text-secondary">
                    Our team is ready to help with setup, collaboration workflows, and decision management questions.
                  </p>
                </div>

                <div className="space-y-4 rounded-[2rem] border border-default bg-surface p-6 shadow-sm">
                  <p className="text-lg font-semibold text-primary">Connect on other channels</p>
                  <div className="grid gap-3">
                    {['Twitter', 'LinkedIn', 'Slack'].map((channel) => (
                      <a
                        key={channel}
                        href="#"
                        className="inline-flex items-center justify-between rounded-2xl border border-default bg-background px-4 py-3 text-sm font-semibold text-secondary transition hover:border-primary-soft hover:bg-primary-soft"
                      >
                        <span>{channel}</span>
                        <span className="text-secondary">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section className="space-y-6 rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <div className="space-y-3">
                  <h2 className="text-2xl font-black text-primary">Frequently Asked Questions</h2>
                  <p className="text-sm leading-7 text-secondary">
                    Answers to the most common questions so you can get back to creating decisions quickly.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      question: 'How do I reset my password?',
                      answer: 'Open the login page and use the Forgot Password link to receive reset instructions by email.',
                    },
                    {
                      question: 'How can I invite collaborators?',
                      answer: 'Share your decision link or add collaborators through your dashboard once the decision is created.',
                    },
                    {
                      question: 'Where can I review policy details?',
                      answer: 'Use the links in the side resources panel to read our latest Privacy Policy and Terms.',
                    },
                  ].map((faq) => (
                    <div key={faq.question} className="rounded-3xl border border-default bg-background p-5">
                      <p className="font-semibold text-primary">{faq.question}</p>
                      <p className="mt-2 text-sm leading-7 text-secondary">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-default bg-background p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Premium support form</p>
                  <p className="mt-2 text-sm leading-7 text-secondary">
                    This form is designed for future backend integration. It currently demonstrates the completed user
                    experience without submitting data.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-secondary">
                      Your Name
                      <input type="text" placeholder="Jane Doe" className={inputClass} />
                    </label>
                    <label className="space-y-2 text-sm text-secondary">
                      Your Email
                      <input type="email" placeholder="you@example.com" className={inputClass} />
                    </label>
                  </div>
                  <label className="space-y-2 text-sm text-secondary">
                    Subject
                    <input type="text" placeholder="Billing, feature request, or technical issue" className={inputClass} />
                  </label>
                  <label className="space-y-2 text-sm text-secondary">
                    Message
                    <textarea rows={5} placeholder="Describe your need in detail..." className={inputClass} />
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-secondary">Note: UI only. Backend integration can be added later without changing layout.</p>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-app transition hover:bg-primary-hover"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
