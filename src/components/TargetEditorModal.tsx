import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils/utils";
import { SalesRepPerformance } from "../types/dashboard";

const targetSchema = z.object({
  target: z.number().min(0, "Target must be positive"),
});

type TargetFormValues = z.infer<typeof targetSchema>;

interface TargetEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (target: number) => Promise<void>;
  rep: SalesRepPerformance | null;
}

export const TargetEditorModal = ({ isOpen, onClose, onSubmit, rep }: TargetEditorModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TargetFormValues>({
    resolver: zodResolver(targetSchema),
    defaultValues: {
      target: rep?.target || 0,
    },
  });

  React.useEffect(() => {
    if (isOpen && rep) {
      reset({ target: rep.target });
    }
  }, [isOpen, rep, reset]);

  const handleFormSubmit = async (data: TargetFormValues) => {
    await onSubmit(data.target);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-bg-card rounded-2xl shadow-2xl z-[101] overflow-hidden border border-border-main"
          >
            <div className="p-6 border-b border-border-main flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                  <Target size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-main">Set Target</h2>
                  <p className="text-xs text-text-muted">{rep?.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-text-main hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue Target ($)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("target", { valueAsNumber: true })}
                  className={cn(
                    "w-full px-4 py-2.5 bg-slate-900 border border-border-main rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-text-main",
                    errors.target && "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500"
                  )}
                  placeholder="0.00"
                />
                {errors.target && <p className="text-[10px] font-bold text-rose-500">{errors.target.message}</p>}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-border-main text-text-muted font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-brand-primary text-bg-main font-semibold rounded-xl hover:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Target</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
