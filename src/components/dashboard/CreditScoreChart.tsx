import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { CreditScoreHistoryPoint } from '../../types/credit';

interface CreditScoreChartProps {
  data: CreditScoreHistoryPoint[];
  startMonth?: string;
  totalChange?: number;
}

export const CreditScoreChart: React.FC<CreditScoreChartProps> = ({
  data,
  startMonth = 'January',
  totalChange = 62,
}) => {
  const minScore = Math.max(300, Math.min(...data.map((d) => d.score)) - 30);
  const maxScore = Math.min(900, Math.max(...data.map((d) => d.score)) + 30);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Credit Score Progress
            </h3>
            <span className="text-xs text-slate-400 font-medium">· Self-Reported Log</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Punctual EMI repayments and decreasing card balances recorded across 6 months
          </p>
        </div>

        {/* Delta Callout */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 bg-emerald-50/80 border border-emerald-200/70 rounded-xl">
          <span className="text-sm font-extrabold text-emerald-800 font-mono tabular-nums">
            +{totalChange} points
          </span>
          <span className="text-xs text-emerald-700">Since {startMonth}</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              domain={[minScore, maxScore]}
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as CreditScoreHistoryPoint;
                  return (
                    <div className="bg-[#0F172A] text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                      <div className="font-semibold text-slate-300">{item.month} 2026</div>
                      <div className="text-base font-bold font-mono text-emerald-400">
                        Score: {item.score}
                      </div>
                      <div className="text-slate-300">
                        Utilization: <span className="font-mono text-white">{item.utilization}%</span>
                      </div>
                      <div className="text-slate-300">
                        DTI: <span className="font-mono text-white">{item.dti}%</span>
                      </div>
                      {item.note && (
                        <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-1 mt-1">
                          {item.note}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', stroke: '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#0F172A', stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Recorded entry dates</span>
        <span>Bureau file range: 300 - 900</span>
      </div>
    </div>
  );
};
