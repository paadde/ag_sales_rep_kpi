import React, { useState, useEffect, useMemo } from "react";
import { SalesRepPerformance, MonthlyTargetPlan } from "../types/dashboard";
import { cn, formatCurrency } from "../utils/utils";
import { 
  ChevronDown, 
  Trophy, 
  Target, 
  Users, 
  Calendar, 
  Filter, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Plus,
  Minus,
  Layout,
  Receipt,
  Search,
  ExternalLink
} from "lucide-react";
import { getMonthlyRevenue, getRepTransactions } from "../services/mockData";
import { motion, AnimatePresence } from "motion/react";

interface SalesRepTabProps {
  reps: SalesRepPerformance[];
  initialRepId?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = [2024, 2025, 2026, 2027];

const CustomNumberInput = ({ value, onChange, className, step = 1000 }: { value: number, onChange: (val: number) => void, className?: string, step?: number }) => (
  <div className={cn("flex items-center bg-slate-900 border border-border-main rounded-xl overflow-hidden group focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all", className)}>
    <button 
      onClick={() => onChange(Math.max(0, value - step))}
      className="p-2 text-slate-500 hover:text-brand-primary hover:bg-slate-800 transition-colors"
    >
      <Minus size={14} />
    </button>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-transparent text-center text-sm font-bold text-text-main focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    <button 
      onClick={() => onChange(value + step)}
      className="p-2 text-slate-500 hover:text-brand-primary hover:bg-slate-800 transition-colors"
    >
      <Plus size={14} />
    </button>
  </div>
);

export const SalesRepTab = ({ reps, initialRepId }: SalesRepTabProps) => {
  const [selectedRepId, setSelectedRepId] = useState<string>(initialRepId || reps[0]?.id || "");
  const [activeSubTab, setActiveSubTab] = useState<"planner" | "transactions">("planner");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [startMonth, setStartMonth] = useState<number>(2); // March
  const [endMonth, setEndMonth] = useState<number>(11); // December
  const [selectedStates, setSelectedStates] = useState<string[]>(["done", "confirmed", "processing"]);
  
  // Local state for editable fields (targets and accounts)
  const [planData, setPlanData] = useState<Record<string, Partial<MonthlyTargetPlan>>>({});

  useEffect(() => {
    if (initialRepId) {
      setSelectedRepId(initialRepId);
    }
  }, [initialRepId]);

  const selectedRep = reps.find(r => r.id === selectedRepId);
  const transactions = useMemo(() => getRepTransactions(selectedRepId), [selectedRepId]);

  // Generate the list of months for the selected range
  const visibleMonths = useMemo(() => {
    const months = [];
    for (let i = startMonth; i <= endMonth; i++) {
      months.push({
        index: i,
        name: MONTHS[i],
        key: `${selectedYear}-${i}`
      });
    }
    return months;
  }, [startMonth, endMonth, selectedYear]);

  // Calculate actuals based on filters
  const processedPlan = useMemo(() => {
    return visibleMonths.map(m => {
      const key = m.key;
      const customData = planData[key] || {};
      
      // Default values if no custom data exists
      const defaultTarget = 50000;
      const defaultNewAccountsWeek = 2;
      
      const target = customData.target ?? defaultTarget;
      const newAccountsWeek = customData.newAccountsWeek ?? defaultNewAccountsWeek;
      const newAccountsMonth = customData.newAccountsMonth ?? (newAccountsWeek * 4);
      
      // Actual is ALWAYS pulled from datasource
      const actual = getMonthlyRevenue(selectedRepId, selectedYear, m.index, selectedStates);
      
      return {
        month: `${m.name} ${selectedYear}`,
        monthIndex: m.index,
        key,
        target,
        newAccountsWeek,
        newAccountsMonth,
        actual
      };
    });
  }, [visibleMonths, selectedRepId, selectedYear, selectedStates, planData]);

  const handleUpdateField = (key: string, field: string, value: number) => {
    setPlanData(prev => {
      const current = prev[key] || {};
      const updated = { ...current };
      
      if (field === "target") {
        updated.target = value;
      } else if (field === "newAccountsWeek") {
        updated.newAccountsWeek = value;
        updated.newAccountsMonth = value * 4;
      } else if (field === "newAccountsMonth") {
        updated.newAccountsMonth = value;
        updated.newAccountsWeek = value / 4;
      }
      
      return { ...prev, [key]: updated };
    });
  };

  const toggleState = (state: string) => {
    setSelectedStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state) 
        : [...prev, state]
    );
  };

  const totals = processedPlan.reduce((acc, curr) => ({
    target: acc.target + curr.target,
    actual: acc.actual + curr.actual,
    newAccounts: acc.newAccounts + curr.newAccountsMonth
  }), { target: 0, actual: 0, newAccounts: 0 });

  const overallVsTarget = totals.actual - totals.target;
  const pacingPercentage = totals.target > 0 ? (totals.actual / totals.target) * 100 : 0;

  if (!selectedRep) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-end border-b border-border-main pb-4">
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-border-main">
          <button
            onClick={() => setActiveSubTab("planner")}
            className={cn(
              "flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-lg transition-all",
              activeSubTab === "planner" ? "bg-brand-primary text-bg-main shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Layout size={14} />
            <span>Planner</span>
          </button>
          <button
            onClick={() => setActiveSubTab("transactions")}
            className={cn(
              "flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-lg transition-all",
              activeSubTab === "transactions" ? "bg-brand-primary text-bg-main shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Receipt size={14} />
            <span>Transactions</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === "planner" ? (
          <motion.div
            key="planner"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            {/* Planner Controls */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Year & Period */}
              <div className="bg-bg-card p-5 rounded-2xl border border-border-main shadow-sm flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Plan Year</label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full appearance-none pl-10 pr-10 py-2.5 bg-slate-900 border border-border-main rounded-xl text-sm font-bold text-text-main hover:border-brand-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
                    >
                      {YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Planning Period</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={startMonth}
                      onChange={(e) => setStartMonth(Number(e.target.value))}
                      className="flex-1 appearance-none px-3 py-2.5 bg-slate-900 border border-border-main rounded-xl text-xs font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
                    >
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i} disabled={i > endMonth}>{m.substring(0, 3)}</option>
                      ))}
                    </select>
                    <span className="text-slate-600 text-xs font-bold">to</span>
                    <select
                      value={endMonth}
                      onChange={(e) => setEndMonth(Number(e.target.value))}
                      className="flex-1 appearance-none px-3 py-2.5 bg-slate-900 border border-border-main rounded-xl text-xs font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
                    >
                      {MONTHS.map((m, i) => (
                        <option key={m} value={i} disabled={i < startMonth}>{m.substring(0, 3)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* State Filter */}
              <div className="bg-bg-card p-5 rounded-2xl border border-border-main shadow-sm space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Revenue States</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["done", "confirmed", "processing"].map(state => (
                    <button
                      key={state}
                      onClick={() => toggleState(state)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2",
                        selectedStates.includes(state)
                          ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                          : "bg-slate-900 border-border-main text-slate-500 hover:text-slate-300"
                      )}
                    >
                      <div className={cn("w-2 h-2 rounded-full", selectedStates.includes(state) ? "bg-brand-primary" : "bg-slate-700")} />
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-bg-card p-5 rounded-2xl border border-border-main shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-text-main">Active Roadmap</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-bg-main text-xs font-bold rounded-xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20">
                  <Plus size={16} />
                  <span>Save Plan</span>
                </button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-border-main">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Period Target</p>
                <p className="text-xl font-bold text-text-main">{formatCurrency(totals.target)}</p>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-border-main">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Actual Revenue</p>
                <p className="text-xl font-bold text-emerald-500">{formatCurrency(totals.actual)}</p>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-border-main">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Variance</p>
                <div className="flex items-center gap-2">
                  <p className={cn("text-xl font-bold", overallVsTarget >= 0 ? "text-emerald-500" : "text-rose-500")}>
                    {formatCurrency(overallVsTarget)}
                  </p>
                  {overallVsTarget >= 0 ? <ArrowUpRight size={16} className="text-emerald-500" /> : <ArrowDownRight size={16} className="text-rose-500" />}
                </div>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-2xl border border-border-main">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pacing</p>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-bold text-brand-primary">{Math.round(pacingPercentage)}%</p>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div 
                      className="h-full bg-brand-primary transition-all duration-1000" 
                      style={{ width: `${Math.min(pacingPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Planner Table */}
            <div className="bg-bg-card rounded-2xl border border-border-main shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">
                    <TrendingUp size={18} className="text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-text-main">Performance Roadmap</h3>
                </div>
                <button className="p-2 text-slate-400 hover:text-text-main hover:bg-slate-800 rounded-lg transition-all">
                  <Download size={18} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/30 border-b border-border-main">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Monthly Target</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">New Accts/Wk</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">New Accts/Mo</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Actual Rev</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Variance</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-main">
                    {processedPlan.map((item) => {
                      const vsTarget = item.actual - item.target;
                      const pacing = item.target > 0 ? (item.actual / item.target) * 100 : 0;
                      
                      let status = "Behind";
                      let statusColor = "text-rose-500 bg-rose-500/10";
                      if (pacing >= 100) {
                        status = "Exceeded";
                        statusColor = "text-emerald-500 bg-emerald-500/10";
                      } else if (pacing >= 90) {
                        status = "On Track";
                        statusColor = "text-blue-500 bg-blue-500/10";
                      } else if (pacing >= 70) {
                        status = "At Risk";
                        statusColor = "text-amber-500 bg-amber-500/10";
                      }

                      return (
                        <tr key={item.key} className="hover:bg-slate-900/20 transition-colors group">
                          <td className="px-6 py-5">
                            <p className="text-sm font-bold text-text-main">{item.month.split(' ')[0]}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{item.month.split(' ')[1]}</p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center">
                              <CustomNumberInput 
                                value={item.target} 
                                onChange={(val) => handleUpdateField(item.key, "target", val)}
                                className="w-36"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center">
                              <CustomNumberInput 
                                value={item.newAccountsWeek} 
                                onChange={(val) => handleUpdateField(item.key, "newAccountsWeek", val)}
                                className="w-24"
                                step={1}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex justify-center">
                              <CustomNumberInput 
                                value={item.newAccountsMonth} 
                                onChange={(val) => handleUpdateField(item.key, "newAccountsMonth", val)}
                                className="w-24"
                                step={1}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-sm font-bold text-text-main">
                              {item.actual > 0 ? formatCurrency(item.actual) : "-"}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className={cn(
                              "text-sm font-bold",
                              vsTarget >= 0 ? "text-emerald-500" : "text-rose-500"
                            )}>
                              {item.actual > 0 ? formatCurrency(vsTarget) : "-"}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              item.actual > 0 ? statusColor : "text-slate-600 bg-slate-900"
                            )}>
                              {item.actual > 0 ? status : "Pending"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            <div className="bg-bg-card rounded-2xl border border-border-main shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">
                    <Receipt size={18} className="text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-text-main">Transaction History</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search transactions..."
                      className="pl-9 pr-4 py-1.5 bg-slate-900 border border-border-main rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary/50 w-64"
                    />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-text-main hover:bg-slate-800 rounded-lg transition-all">
                    <Filter size={18} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/30 border-b border-border-main">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-main">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-900/20 transition-colors">
                        <td className="px-6 py-4 text-xs font-medium text-slate-400">{tx.date}</td>
                        <td className="px-6 py-4 text-sm font-bold text-text-main">{tx.customer}</td>
                        <td className="px-6 py-4 text-xs text-text-muted">{tx.product}</td>
                        <td className="px-6 py-4 text-sm font-bold text-text-main text-right">{formatCurrency(tx.amount)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                            tx.status === "done" ? "text-emerald-500 bg-emerald-500/10" :
                            tx.status === "confirmed" ? "text-blue-500 bg-blue-500/10" :
                            "text-amber-500 bg-amber-500/10"
                          )}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-1.5 text-slate-500 hover:text-brand-primary hover:bg-slate-800 rounded-lg transition-all">
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planning Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/10 flex gap-4">
          <div className="p-3 bg-brand-primary/10 rounded-xl h-fit">
            <Target size={24} className="text-brand-primary" />
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-1">Strategic Goal Setting</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Adjust monthly targets based on seasonal trends and rep ramp-up periods. 
              The "New Accounts" targets automatically sync to help maintain a healthy pipeline.
            </p>
          </div>
        </div>
        <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10 flex gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl h-fit">
            <Users size={24} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-1">Performance Insights</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Actual revenue is pulled directly from the transaction database. 
              Use the state filters to see how "Processing" or "Confirmed" orders impact the roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
