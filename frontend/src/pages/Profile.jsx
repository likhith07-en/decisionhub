import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-blue-500/20">
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-slate-400 text-sm">{user.email}</p>
            <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>{user.role}</span>
            </div>
          </div>
        </div>

        <hr className="border-slate-800" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Account Name</p>
              <p className="text-sm font-semibold text-white">{user.name}</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center space-x-3">
            <Mail className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Email Address</p>
              <p className="text-sm font-semibold text-white">{user.email}</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Member Since</p>
              <p className="text-sm font-semibold text-white">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'}
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 flex items-center space-x-3">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xs text-slate-500 font-medium">Voting Privileges</p>
              <p className="text-sm font-semibold text-emerald-400">Verified Contributor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
