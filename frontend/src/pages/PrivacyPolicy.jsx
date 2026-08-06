import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function PrivacyPolicy() {
  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
            <div className="mb-10 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white shadow-2xl shadow-blue-500/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-200">Privacy Policy</p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight">Your data, our promise.</h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
                    We keep privacy simple, secure, and transparent. This policy explains what we collect, how we use it,
                    and how you remain in control.
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
                <h2 className="text-2xl font-black text-primary">Introduction</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  DecisionHub is built for collaborative decision-making. We collect only the information required to
                  deliver the product experience, protect your account, and improve our service. This document describes
                  the types of data we use and how we safeguard it.
                </p>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Information We Collect</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Account details</p>
                    <p className="mt-3 text-sm leading-7 text-secondary">
                      Name, email, authentication tokens, and basic profile metadata to let you sign in and access your
                      decisions securely.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Usage data</p>
                    <p className="mt-3 text-sm leading-7 text-secondary">
                      App usage patterns, page views, and feature interactions are used to refine the platform and keep
                      performance fast and reliable.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">How We Use Your Data</h2>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-secondary">
                  <li className="rounded-3xl border border-default bg-background p-5">
                    <strong className="font-semibold text-primary">Deliver the service.</strong> Your information powers
                    authentication, decision creation, polling, and reporting.
                  </li>
                  <li className="rounded-3xl border border-default bg-background p-5">
                    <strong className="font-semibold text-primary">Improve product quality.</strong> We analyze usage
                    data to identify trends and keep the platform intuitive.
                  </li>
                  <li className="rounded-3xl border border-default bg-background p-5">
                    <strong className="font-semibold text-primary">Protect your account.</strong> Safety measures help
                    prevent unauthorized access and maintain service reliability.
                  </li>
                </ul>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Sharing and Disclosure</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  We do not sell your personal data. Information is shared only when required to provide the service,
                  comply with the law, or with your explicit permission.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Service providers</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Third-party tools that help host and secure the application.</p>
                  </div>
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Legal requests</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">When required by law, we may respond to valid legal requests.</p>
                  </div>
                </div>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Your Rights</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Access</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Review the account and decision data associated with your profile.</p>
                  </div>
                  <div className="rounded-3xl border border-default bg-background p-5">
                    <p className="font-semibold text-primary">Corrections</p>
                    <p className="mt-2 text-sm leading-7 text-secondary">Update profile information through the application controls.</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-secondary">
                  For questions about privacy, use the Contact Support page to reach our team.
                </p>
              </article>

              <article className="rounded-[2rem] border border-default bg-surface p-8 shadow-sm">
                <h2 className="text-2xl font-black text-primary">Policy Updates</h2>
                <p className="mt-4 text-sm leading-7 text-secondary">
                  We may update this policy from time to time. When changes occur, we will publish the latest version
                  inside the app and via notification if available.
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
