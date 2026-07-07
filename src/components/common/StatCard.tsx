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
  emerald: 'from-emerald-600 to-teal-700 border-emerald-500/30 text-white hover:from-emerald-500 hover:to-teal-600 hover:border-emerald-400/50 shadow-md hover:shadow-lg shadow-emerald-950/10 hover:shadow-emerald-600/20',
  blue: 'from-blue-600 to-indigo-700 border-blue-500/30 text-white hover:from-blue-500 hover:to-indigo-600 hover:border-blue-400/50 shadow-md hover:shadow-lg shadow-blue-950/10 hover:shadow-blue-600/20',
  amber: 'from-amber-500 to-orange-600 border-amber-500/30 text-white hover:from-amber-400 hover:to-orange-500 hover:border-amber-400/50 shadow-md hover:shadow-lg shadow-amber-950/10 hover:shadow-amber-500/20',
  rose: 'from-rose-500 to-pink-600 border-rose-500/30 text-white hover:from-rose-400 hover:to-pink-500 hover:border-rose-350/50 shadow-md hover:shadow-lg shadow-rose-950/10 hover:shadow-rose-500/20',
  purple: 'from-purple-600 to-violet-700 border-purple-500/30 text-white hover:from-purple-500 hover:to-violet-600 hover:border-purple-400/50 shadow-md hover:shadow-lg shadow-purple-950/10 hover:shadow-purple-600/20',
};

const titleColorMap = {
  emerald: 'text-emerald-100/90',
  blue: 'text-blue-100/90',
  amber: 'text-amber-50/90',
  rose: 'text-rose-100/90',
  purple: 'text-purple-100/90',
};

const unitColorMap = {
  emerald: 'text-emerald-200/80',
  blue: 'text-blue-200/80',
  amber: 'text-amber-100/80',
  rose: 'text-rose-200/80',
  purple: 'text-purple-200/80',
};

const descriptionColorMap = {
  emerald: 'text-emerald-200/70',
  blue: 'text-blue-200/70',
  amber: 'text-amber-100/70',
  rose: 'text-rose-200/70',
  purple: 'text-purple-200/70',
};

const iconBgMap = {
  emerald: 'bg-white/20 text-white',
  blue: 'bg-white/20 text-white',
  amber: 'bg-white/20 text-white',
  rose: 'bg-white/20 text-white',
  purple: 'bg-white/20 text-white',
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
  const titleColor = titleColorMap[color];
  const unitColor = unitColorMap[color];
  const descriptionColor = descriptionColorMap[color];
  const iconBg = iconBgMap[color];

  return (
    <div className={`bg-gradient-to-br ${colors} border backdrop-blur-sm p-5 rounded-2xl transition-all duration-300 flex items-start justify-between group cursor-default hover:-translate-y-0.5`}>
      <div>
        <p className={`text-[10px] font-bold ${titleColor} uppercase tracking-wider mb-1`}>{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl lg:text-3xl font-extrabold text-white group-hover:scale-105 transition-transform inline-block origin-left">
            {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
          </span>
          {unit && <span className={`text-xs font-semibold ${unitColor}`}>{unit}</span>}
        </div>
        {description && (
          <p className={`text-xs mt-1 ${descriptionColor}`}>{description}</p>
        )}
      </div>
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
