import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useFinancialData } from '../../context/FinancialDataContext';
import { calculateDTI, calculateUtilization, formatCurrency, formatPercentage } from '../../utils/calculations';

interface QuickUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickUpdateModal: React.FC<QuickUpdateModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateFinancialMetrics } = useFinancialData();

  const [monthlyIncome, setMonthlyIncome] = useState<number>(profile.monthlyIncome);
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState<number>(profile.monthlyDebtPayments);
  const [totalCreditUsed, setTotalCreditUsed] = useState<number>(profile.totalCreditUsed);
  const [totalCreditLimit, setTotalCreditLimit] = useState<number>(profile.totalCreditLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with current profile on open
  React.useEffect(() => {
    if (isOpen) {
      setMonthlyIncome(profile.monthlyIncome);
      setMonthlyDebtPayments(profile.monthlyDebtPayments);
      setTotalCreditUsed(profile.totalCreditUsed);
      setTotalCreditLimit(profile.totalCreditLimit);
    }
  }, [isOpen, profile]);

  // Live recalculated preview
  const liveDTI = calculateDTI(monthlyDebtPayments, monthlyIncome);
  const liveUtilization = calculateUtilization(totalCreditUsed, totalCreditLimit);

  const prevDTI = calculateDTI(profile.monthlyDebtPayments, profile.monthlyIncome);
  const prevUtilization = calculateUtilization(profile.totalCreditUsed, profile.totalCreditLimit);

  const dtiDelta = Math.round((liveDTI - prevDTI) * 10) / 10;
  const utilDelta = Math.round((liveUtilization - prevUtilization) * 10) / 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await updateFinancialMetrics({
      monthlyIncome: Number(monthlyIncome),
      monthlyDebtPayments: Number(monthlyDebtPayments),
      totalCreditUsed: Number(totalCreditUsed),
      totalCreditLimit: Number(totalCreditLimit),
    }, 'Manual metric adjustment');

    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Financial Metrics"
      subtitle="Recalculate your Debt-to-Income (DTI) and Revolving Utilization in real time."
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="emerald"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Apply & Recalculate
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Live Delta Preview Box */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Projected DTI Ratio:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500 line-through text-[11px]">
                {formatPercentage(prevDTI)}
              </span>
              <span className="font-mono font-bold text-slate-900">
                {formatPercentage(liveDTI)}
              </span>
              {dtiDelta !== 0 && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                    dtiDelta < 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {dtiDelta < 0 ? `${dtiDelta}%` : `+${dtiDelta}%`}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Projected Credit Utilization:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500 line-through text-[11px]">
                {formatPercentage(prevUtilization)}
              </span>
              <span className="font-mono font-bold text-slate-900">
                {formatPercentage(liveUtilization)}
              </span>
              {utilDelta !== 0 && (
                <span
                  className={`text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                    utilDelta < 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {utilDelta < 0 ? `${utilDelta}%` : `+${utilDelta}%`}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Gross Monthly Income"
            type="number"
            min="1000"
            step="1000"
            prefixText="₹"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            helperText="In-hand/credited monthly salary"
            required
          />

          <Input
            label="Monthly Debt/EMI Payments"
            type="number"
            min="0"
            step="500"
            prefixText="₹"
            value={monthlyDebtPayments}
            onChange={(e) => setMonthlyDebtPayments(Number(e.target.value))}
            helperText="Sum of all loan EMIs + card minimums"
            required
          />

          <Input
            label="Total Credit Card Balance"
            type="number"
            min="0"
            step="1000"
            prefixText="₹"
            value={totalCreditUsed}
            onChange={(e) => setTotalCreditUsed(Number(e.target.value))}
            helperText="Active revolving card balance"
            required
          />

          <Input
            label="Total Credit Card Limit"
            type="number"
            min="1000"
            step="5000"
            prefixText="₹"
            value={totalCreditLimit}
            onChange={(e) => setTotalCreditLimit(Number(e.target.value))}
            helperText="Combined limit across all cards"
            required
          />
        </div>

        <p className="text-[11px] text-slate-500 italic mt-2">
          Note: Updating your debt balances and limits updates your derived financial health indicators. Official credit bureau scores are determined independently by CICs upon monthly lender reporting.
        </p>
      </form>
    </Modal>
  );
};
