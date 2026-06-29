'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  description,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-start justify-between group">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
            {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
          </span>
          {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
        </div>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
