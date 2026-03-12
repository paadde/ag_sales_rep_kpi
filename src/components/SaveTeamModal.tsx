import React, { useState } from "react";
import { X, Users } from "lucide-react";
import { cn } from "../utils/utils";

interface SaveTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  repCount: number;
  initialName?: string;
  mode?: "create" | "edit";
}

export const SaveTeamModal = ({ isOpen, onClose, onSave, repCount, initialName = "", mode = "create" }: SaveTeamModalProps) => {
  const [name, setName] = React.useState(initialName);

  React.useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg-card w-full max-w-md rounded-3xl border border-border-main shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border-main flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">{mode === "create" ? "Save New Team" : "Edit Team Name"}</h2>
              <p className="text-xs text-text-muted">
                {mode === "create" 
                  ? `Create a custom view for ${repCount} representatives.` 
                  : `Update details for this group of ${repCount} representatives.`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Team Name</label>
            <input 
              type="text" 
              placeholder="e.g. West Coast Team, High Performers..." 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-border-main rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-text-main"
              autoFocus
            />
          </div>
        </div>

        <div className="p-6 bg-slate-900/30 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-border-main text-slate-400 font-bold rounded-xl hover:bg-slate-800 transition-colors text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (name.trim()) {
                onSave(name);
              }
            }}
            disabled={!name.trim()}
            className="flex-[2] px-6 py-3 bg-brand-primary text-bg-main font-bold rounded-xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {mode === "create" ? "Save Team" : "Update Team"}
          </button>
        </div>
      </div>
    </div>
  );
};
