import React, { useState, useRef, useEffect } from "react";
import { User, Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "../utils/utils";
import { SalesRepPerformance } from "../types/dashboard";

interface RepFilterProps {
  reps: SalesRepPerformance[];
  selectedRepIds: string[];
  onChange: (ids: string[]) => void;
}

export const RepFilter = ({ reps, selectedRepIds, onChange }: RepFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRep = (id: string) => {
    if (selectedRepIds.includes(id)) {
      onChange(selectedRepIds.filter(i => i !== id));
    } else {
      onChange([...selectedRepIds, id]);
    }
  };

  const filteredReps = reps.filter(rep => 
    rep.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedReps = reps.filter(rep => selectedRepIds.includes(rep.id));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full lg:w-64 px-4 py-2.5 bg-slate-900 border border-border-main rounded-xl text-xs font-bold text-text-main hover:border-brand-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <User size={14} className="text-slate-500 shrink-0" />
          <span className="truncate">
            {selectedRepIds.length === 0 
              ? "All Representatives" 
              : selectedRepIds.length === 1 
                ? selectedReps[0]?.name 
                : `${selectedRepIds.length} Reps Selected`}
          </span>
        </div>
        <ChevronDown size={14} className={cn("text-slate-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full lg:w-72 bg-bg-card border border-border-main rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-border-main bg-slate-900/50">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search representatives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-border-main rounded-xl text-xs focus:outline-none focus:border-brand-primary transition-all text-text-main"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            <button
              onClick={() => onChange([])}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium text-text-main hover:bg-slate-800 transition-colors"
            >
              <span>Select All</span>
              {selectedRepIds.length === 0 && <Check size={14} className="text-brand-primary" />}
            </button>
            <div className="h-px bg-border-main my-1 mx-2" />
            {filteredReps.map((rep) => (
              <button
                key={rep.id}
                onClick={() => toggleRep(rep.id)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs transition-all",
                  selectedRepIds.includes(rep.id) 
                    ? "bg-brand-primary/10 text-brand-primary font-bold" 
                    : "text-slate-400 hover:bg-slate-800"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    selectedRepIds.includes(rep.id) ? "bg-brand-primary" : "bg-slate-700"
                  )} />
                  <span>{rep.name}</span>
                </div>
                {selectedRepIds.includes(rep.id) && <Check size={14} />}
              </button>
            ))}
            {filteredReps.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-xs text-slate-500 italic">No representatives found</p>
              </div>
            )}
          </div>

          {selectedRepIds.length > 0 && (
            <div className="p-2 border-t border-border-main bg-slate-900/30 flex justify-end">
              <button
                onClick={() => onChange([])}
                className="text-[10px] font-bold text-slate-500 hover:text-brand-primary transition-colors uppercase tracking-wider px-2 py-1"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
