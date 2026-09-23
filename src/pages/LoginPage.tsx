import React, { useState } from 'react';
import { Logo } from '../components/common/Logo';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loadDemoUser } = useAuth();
  const { showSuccess, showError } = useToast();

  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('SecurePass123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await login({ email, password, rememberMe });
    setIsLoading(false);
    if (ok) {
      showSuccess('Welcome back!', 'Signed in successfully.');
      onNavigate('/dashboard');
    } else {
      showError('Login failed', 'Please check your credentials or use the demo login.');
    }
  };

  const handleDemoLogin = () => {
    loadDemoUser();
    showSuccess('Demo Account Loaded', 'Signed in as Rahul Sharma.');
    onNavigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#0F172A]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-1.5 text-xs text-slate-500">
          Access your credit health diagnostics, AI roadmap, and history
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-2xl sm:px-10 space-y-5">
          {/* Quick Demo Login Helper Box */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Review Access</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Explore the full production experience pre-loaded with Rahul Sharma's Indian credit profile.
            </p>
            <Button
              variant="emerald"
              size="sm"
              onClick={handleDemoLogin}
              className="w-full"
            >
              Sign In as Rahul Sharma (Demo)
            </Button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink mx-3 text-xs text-slate-400 uppercase font-semibold">
              Or with credentials
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-slate-900"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Demo notice: Use the instant demo login button to sign in directly.')}
                className="text-slate-600 hover:text-slate-900 font-medium hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate('/register')}
              className="font-bold text-slate-900 hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Back to Home Link */}
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
