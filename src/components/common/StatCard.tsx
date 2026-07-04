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
  color?: 'emerald' | 'blue' | 'amber' | 'rose' | 'purple';
}

const colorMap = {
  emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400 hover:border-emerald-400/60 hover:from-emerald-500/30',
  blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 hover:border-blue-400/60 hover:from-blue-500/30',
  amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-400 hover:border-amber-400/60 hover:from-amber-500/30',
  rose: 'from-rose-500/20 to-rose-600/20 border-rose-500/30 text-rose-400 hover:border-rose-400/60 hover:from-rose-500/30',
  purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400 hover:border-purple-400/60 hover:from-purple-500/30',
};

const iconBgMap = {
  emerald: 'bg-emerald-500/20 text-emerald-400',
  blue: 'bg-blue-500/20 text-blue-400',
  amber: 'bg-amber-500/20 text-amber-400',
  rose: 'bg-rose-500/20 text-rose-400',
  purple: 'bg-purple-500/20 text-purple-400',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  description,
  color = 'emerald',
}) => {
  const colors = colorMap[color];
  const iconBg = iconBgMap[color];

  return (
    <div className={`bg-gradient-to-br ${colors} border backdrop-blur-sm p-5 rounded-2xl transition-all duration-300 flex items-start justify-between group cursor-default`}>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl lg:text-3xl font-extrabold text-white group-hover:scale-105 transition-transform inline-block origin-left">
            {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
          </span>
          {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
        </div>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
