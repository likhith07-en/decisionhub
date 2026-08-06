import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const infoTiles = [
    {
      label: 'Account Name',
      value: user.name || '—',
      icon: (
        <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: 'Email Address',
      value: user.email || '—',
      icon: (
        <svg className="h-5 w-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Member Since',
      value: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Active Member',
      icon: (
        <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Role',
      value: user.role || 'USER',
      icon: (
        <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page-shell min-h-screen flex flex-col sm:pr-[60px]">
      <Navbar />
      <IconSidebar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-text-primary">Profile</h1>
              <p className="mt-1 text-muted">Your account information and preferences.</p>
            </div>

            {/* Profile hero card */}
            <div className="mb-6 rounded-[2rem] border border-default bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-5">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || user.email}
                    className="h-16 w-16 rounded-full ring-4"
                    style={{ '--tw-ring-color': 'var(--primary-soft)' }}
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-black text-white">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-black tracking-tight text-text-primary">{user.name || 'User'}</h2>
                  <p className="text-sm text-muted">{user.email}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary-hover">
                    {user.role || 'USER'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info tiles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {infoTiles.map((tile) => (
                <div
                  key={tile.label}
                  className="flex items-center gap-4 rounded-2xl border border-default bg-surface p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background">
                    {tile.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{tile.label}</p>
                    <p className="text-sm font-semibold text-text-primary">{tile.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
