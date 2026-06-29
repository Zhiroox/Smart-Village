'use client';

import React from 'react';
import { VillageName } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface VillageSelectorProps {
  selectedVillage: VillageName;
  onSelectVillage: (village: VillageName) => void;
  showAllOption?: boolean;
}

export const VillageSelector: React.FC<VillageSelectorProps> = ({
  selectedVillage,
  onSelectVillage,
  showAllOption = true,
}) => {
  const options: VillageName[] = showAllOption 
    ? ['Semua Desa', 'Desa Pagutan', 'Desa Bujak']
    : ['Desa Pagutan', 'Desa Bujak'];

  return (
    <div className="inline-flex p-1.5 bg-slate-200/80 backdrop-blur rounded-xl border border-slate-300/60 shadow-inner">
      {options.map((village) => {
        const isActive = selectedVillage === village;
        return (
          <button
            key={village}
            onClick={() => onSelectVillage(village)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
            {village}
          </button>
        );
      })}
    </div>
  );
};
