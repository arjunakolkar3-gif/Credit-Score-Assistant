import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  Building2,
  ShieldCheck,
  Download,
  Trash2,
  RefreshCw,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinancialData } from '../context/FinancialDataContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatCurrency } from '../utils/calculations';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { profile, updateFinancialMetrics, resetToDemoData } = useFinancialData();
  const { showSuccess, showInfo } = useToast();

  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'rahul.sharma@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    showSuccess('Profile updated', 'Your personal details have been saved.');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ user, profile }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `credit_assistant_profile_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showInfo('Data exported', 'Your profile backup has been downloaded.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
            {name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Verified Profile
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Member since {user?.joinedDate || 'January 2026'} · PAN: {user?.panNumber || 'ABCDE****F'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDemoData}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset Demo
          </Button>
        </div>
      </div>

      {/* Personal Profile Details Form */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
            <p className="text-xs text-slate-500">
              Manage your personal credentials and contact coordinates
            </p>
          </div>
          <Button
            variant={isEditing ? 'ghost' : 'outline'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Details'}
          </Button>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<UserIcon className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Phone Number"
              value={phone}
              disabled={!isEditing}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <Input
              label="Permanent Account Number (PAN)"
              value="ABCDE****F"
              disabled
              helperText="Masked for privacy. Used solely for financial record organization."
            />
          </div>

          {isEditing && (
            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Connected Financial Institutions */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Recorded Financial Institutions
          </h3>
          <p className="text-xs text-slate-500">
            Self-reported loan accounts and active credit card facilities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">HDFC Bank</span>
            <span className="text-xs text-slate-500 block">Regalia Gold Card & Two-Wheeler Loan</span>
            <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
              Active · Verified
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">ICICI Bank</span>
            <span className="text-xs text-slate-500 block">Coral RuPay Credit Card</span>
            <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
              Active · Verified
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
            <span className="text-xs font-bold text-slate-900 block">Bajaj Finance</span>
            <span className="text-xs text-slate-500 block">Personal Loan (₹90,000 balance)</span>
            <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
              Active · Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
