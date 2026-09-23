import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from 'lucide-react';
import { useFinancialData } from '../context/FinancialDataContext';
import { CreditScoreChart } from '../components/dashboard/CreditScoreChart';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { CreditScoreHistoryPoint } from '../types/credit';

interface ProgressPageProps {
  onOpenQuickUpdate?: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onOpenQuickUpdate }) => {
  const { history, profile, dti, utilization, updateFinancialMetrics } = useFinancialData();

  const [isAddSnapshotModalOpen, setIsAddSnapshotModalOpen] = useState(false);
  const [newScore, setNewScore] = useState(profile.creditScore);
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Historical milestones
  const milestones = [
    {
      id: 'm1',
      title: 'Crossed 700 Credit Score',
      date: 'March 2026',
      description: 'Entered the Good credit health tier unlocking favorable lending terms.',
      achieved: true,
      icon: Award,
    },
    {
      id: 'm2',
      title: 'Reduced Utilization Below 30%',
      date: 'April 2026',
      description: 'Revolving card balances dropped below the primary 30% financial ceiling.',
      achieved: true,
      icon: CheckCircle2,
    },
    {
      id: 'm3',
      title: 'Maintained 100% On-Time Payments for 6 Months',
      date: 'June 2026',
      description: 'Zero missed NACH auto-debits across all active loan and card accounts.',
      achieved: true,
      icon: CheckCircle2,
    },
    {
      id: 'm4',
      title: 'Next Target: Prime 750+ Tier',
      date: 'Upcoming Target',
      description: 'Achieve prime tier rating for maximum home loan interest rate concessions.',
      achieved: false,
      icon: Sparkles,
    },
  ];

  const handleSaveSnapshot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateFinancialMetrics(
      { creditScore: Number(newScore) },
      noteText || 'Monthly progress log'
    );
    setIsSaving(false);
    setIsAddSnapshotModalOpen(false);
    setNoteText('');
  };

  const initial = history[0] || { score: 680, utilization: 42, dti: 36 };
  const latest = history[history.length - 1] || { score: 742, utilization: 24, dti: 28 };

  const scoreDelta = latest.score - initial.score;
  const utilDelta = Math.round((latest.utilization - initial.utilization) * 10) / 10;
  const dtiDelta = Math.round((latest.dti - initial.dti) * 10) / 10;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">Credit Progress & Milestones</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your financial trajectory from baseline to present day.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddSnapshotModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Log Monthly Snapshot
        </Button>
      </div>

      {/* Metric Comparisons Over Time Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Score Comparison */}
        <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Reported Score Trajectory
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500 font-mono">Jan: {initial.score}</span>
            <span className="text-slate-300">→</span>
            <span className="text-2xl font-black font-mono text-slate-900">
              Jun: {latest.score}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{scoreDelta} points gained</span>
          </div>
        </div>

        {/* Utilization Comparison */}
        <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Utilization Rate
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500 font-mono">{initial.utilization}%</span>
            <span className="text-slate-300">→</span>
            <span className="text-2xl font-black font-mono text-slate-900">
              {latest.utilization}%
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ArrowDownRight className="w-4 h-4" />
            <span>{utilDelta}% reduction</span>
          </div>
        </div>

        {/* DTI Comparison */}
        <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Debt-to-Income (DTI)
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-500 font-mono">{initial.dti}%</span>
            <span className="text-slate-300">→</span>
            <span className="text-2xl font-black font-mono text-slate-900">
              {latest.dti}%
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <ArrowDownRight className="w-4 h-4" />
            <span>{dtiDelta}% reduction</span>
          </div>
        </div>
      </div>

      {/* Large Historical Chart */}
      <div>
        <CreditScoreChart data={history} startMonth="January" totalChange={scoreDelta} />
      </div>

      {/* Milestone Celebrations */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Milestone Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className={`p-4 rounded-xl border space-y-2 flex flex-col justify-between ${
                  m.achieved
                    ? 'bg-emerald-50/40 border-emerald-200/80'
                    : 'bg-slate-50/60 border-slate-200 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        m.achieved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        m.achieved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.achieved ? 'Achieved' : 'In Progress'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{m.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {m.description}
                  </p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 block pt-2 border-t border-slate-200/60">
                  {m.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Snapshots Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Historical Snapshot Logs</h3>
          <span className="text-xs text-slate-400 font-medium">
            {history.length} Entries Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Month / Date</th>
                <th className="px-4 py-3">Credit Score</th>
                <th className="px-4 py-3">Utilization</th>
                <th className="px-4 py-3">DTI Ratio</th>
                <th className="px-4 py-3">Log Event / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((pt, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {pt.month} 2026 ({pt.date})
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">
                    {pt.score}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">
                    {pt.utilization}%
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-700">
                    {pt.dti}%
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {pt.note || 'Monthly log'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Snapshot Modal */}
      <Modal
        isOpen={isAddSnapshotModalOpen}
        onClose={() => setIsAddSnapshotModalOpen(false)}
        title="Log Monthly Credit Snapshot"
        subtitle="Record your monthly reported score and observations into your personal timeline."
        maxWidth="sm"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddSnapshotModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveSnapshot}
              isLoading={isSaving}
            >
              Save Snapshot
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveSnapshot} className="space-y-4">
          <Input
            label="Current Reported Credit Score"
            type="number"
            min="300"
            max="900"
            value={newScore}
            onChange={(e) => setNewScore(Number(e.target.value))}
            required
            helperText="Official bureau score range 300 to 900"
          />

          <Input
            label="Event Note / Observation"
            type="text"
            placeholder="e.g. Paid off HDFC card dues, Two-wheeler loan closed"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            helperText="Brief note describing any financial actions taken this month"
          />
        </form>
      </Modal>
    </div>
  );
};
