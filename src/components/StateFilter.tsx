import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "../utils/utils";

interface StateFilterProps {
  selectedStates: string[];
  onChange: (states: string[]) => void;
}

const STATES = [
  { id: "done", label: "Done" },
  { id: "processing", label: "Processing" },
  { id: "confirmed", label: "Confirmed" },
];

export const StateFilter = ({ selectedStates, onChange }: StateFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleState = (stateId: string) => {
    if (selectedStates.includes(stateId)) {
      onChange(selectedStates.filter((s) => s !== stateId));
    } else {
      onChange([...selectedStates, stateId]);
    }
  };

  const selectAll = () => onChange(STATES.map((s) => s.id));
  const deselectAll = () => onChange([]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 bg-slate-900 border border-border-main rounded-xl text-xs font-bold transition-all hover:border-slate-700",
          isOpen && "border-brand-primary ring-2 ring-brand-primary/10"
        )}
      >
        <span className="text-slate-400 uppercase tracking-wider">State:</span>
        <span className="text-text-main">
          {selectedStates.length === 0 
            ? "None" 
            : selectedStates.length === STATES.length 
              ? "All States" 
              : `${selectedStates.length} Selected`}
        </span>
        <ChevronDown size={14} className={cn("text-slate-500 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-main rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-border-main flex items-center justify-between bg-slate-900/50">
            <button 
              onClick={selectAll}
              className="text-[10px] font-bold text-brand-primary hover:text-brand-accent px-2 py-1"
            >
              Select All
            </button>
            <button 
              onClick={deselectAll}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-300 px-2 py-1"
            >
              Deselect All
            </button>
          </div>
          <div className="p-1">
            {STATES.map((state) => {
              const isSelected = selectedStates.includes(state.id);
              return (
                <button
                  key={state.id}
                  onClick={() => toggleState(state.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors",
                    isSelected ? "bg-brand-primary/10 text-brand-primary" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <span className="font-medium">{state.label}</span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
