import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function TermsConditions() {
  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
            <div className="mb-10 rounded-[2rem] bg-gradient-to-r from-indigo-700 to-blue-600 p-10 text-white shadow-2xl shadow-blue-500/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Terms & Conditions</p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight">Using DecisionHub responsibly.</h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                    These terms explain how you may use the platform, what we expect from you, and how we support a secure,
                    collaborative experience.
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

            <section className="space-y-8">
              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Acceptance of Terms</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  By using DecisionHub, you agree to these terms. Please read them carefully. If you do not agree,
                  discontinue use immediately.
                </p>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Account Requirements</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  You are responsible for keeping your account credentials secure. Account access is personal and must
                  not be shared with others.
                </p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-secondary">
                  <li className="rounded-3xl border border-default bg-background p-5">
                    Use accurate information when registering.
                  </li>
                  <li className="rounded-3xl border border-default bg-background p-5">
                    Maintain control of your login credentials.
                  </li>
                  <li className="rounded-3xl border border-default bg-background p-5">
                    Notify support immediately if you suspect unauthorized access.
                  </li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Acceptable Use</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  DecisionHub is intended for collaborative decision-making. Do not use the platform for unlawful,
                  abusive, or malicious activity.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Do not</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Share harmful content or try to compromise the service.</p>
                  </div>
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Do</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Respect collaborators and keep decisions aligned with team goals.</p>
                  </div>
                </div>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Intellectual Property</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  The platform, branding, and underlying technology are owned by DecisionHub. Your decision content belongs
                  to you, subject to these terms.
                </p>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Disclaimers and Limitations</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  DecisionHub is provided "as is" and without warranties to the fullest extent permitted by law. We do not
                  guarantee uninterrupted service or complete accuracy of user-generated content.
                </p>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  We are not liable for indirect, special, or consequential losses arising from your use of the platform.
                </p>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Governing Law</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  These terms are governed by the laws applicable to the service provider. Any disputes should be
                  resolved in accordance with the applicable regulatory framework.
                </p>
                <p className="mt-6 text-sm leading-7 text-secondary">
                  If you have questions about these terms, please visit Contact Support for assistance.
                </p>
              </article>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
