import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError('Passwords do not match', 'Please ensure both password fields match.');
      return;
    }
    if (!agreeTerms) {
      showError('Terms required', 'Please accept the terms of service to proceed.');
      return;
    }

    setIsLoading(true);
    const ok = await register({ name, email, password });
    setIsLoading(false);

    if (ok) {
      showSuccess('Account created!', 'Let\'s configure your financial profile.');
      onNavigate('/onboarding');
    } else {
      showError('Registration failed', 'Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#0F172A]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Create your Credit Assistant account
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Begin your journey toward healthy DTI, optimized utilization, and higher creditworthiness
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-2xl sm:px-10 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<UserIcon className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded accent-slate-900 mt-0.5 cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-normal cursor-pointer">
                I understand that Credit Assistant provides educational tools and self-reported credit tracking, and does not claim to replace official credit bureaus.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Onboarding
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="font-bold text-slate-900 hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700"
          >
            ← Return to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};
