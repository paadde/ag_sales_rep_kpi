import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Package, 
  Users as UsersIcon,
  BarChart2,
  CheckSquare,
  Square,
  PlusCircle,
  Users,
  Save,
  Edit2,
  Trash2,
  Plus,
  Download
} from "lucide-react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "../utils/utils";
import { SalesRepPerformance } from "../types/dashboard";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar,
  Cell,
  CartesianGrid
} from "recharts";

interface SalesTableProps {
  data: SalesRepPerformance[];
  onEditTarget: (rep: SalesRepPerformance) => void;
  filterKey?: string; // Used to force re-render of expanded details when filters change
  isAllProducts?: boolean;
  teams: {id: string, name: string, repIds: string[]}[];
  selectedTeamId: string;
  onSelectTeam: (id: string) => void;
  onSaveTeam: (name: string, repIds: string[]) => void;
  onUpdateTeam: (id: string, name: string, repIds: string[]) => void;
  onDeleteTeam: (id: string) => void;
  onExport: (rep: SalesRepPerformance) => void;
}

const RepDetails = ({ rep }: { rep: SalesRepPerformance }) => {
  if (!rep.details) {
    return (
      <div className="p-8 text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
        <p className="text-sm text-text-muted italic">Detailed analytics for this representative are being processed...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900/40 rounded-xl border border-slate-800/50 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Sales Trend */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-primary" />
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Trend</h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Live Data
          </span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rep.details.salesTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '11px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UsersIcon size={16} className="text-emerald-500" />
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Customers</h4>
        </div>
        <div className="space-y-2">
          {rep.details.topCustomers.map((customer, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg border border-slate-800/50">
              <span className="text-xs font-medium text-text-main">{customer.name}</span>
              <span className="text-xs font-bold text-brand-primary">{formatCurrency(customer.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-amber-500" />
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Products Sold</h4>
        </div>
        <div className="space-y-4">
          {rep.details.topProducts.map((p, i) => {
            const maxSales = Math.max(...rep.details!.topProducts.map(tp => tp.sales));
            const percentage = (p.sales / maxSales) * 100;
            
            return (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-medium text-slate-300 leading-none">{p.name}</span>
                  <span className="text-xs font-bold text-emerald-500 leading-none">{p.sales} units</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn(
                      "h-full rounded-full",
                      i === 0 ? "bg-emerald-500" : "bg-emerald-600/60"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Acquisition */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-blue-500" />
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Acquisition</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/50 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">New Customers</p>
            <p className="text-xl font-bold text-emerald-500">
              {rep.details.customerAcquisition.reduce((acc, curr) => acc + curr.newCustomers, 0)}
            </p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/50 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Old Customers</p>
            <p className="text-xl font-bold text-slate-300">
              {rep.details.customerAcquisition.reduce((acc, curr) => acc + curr.oldCustomers, 0)}
            </p>
          </div>
        </div>
        <div className="p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
          <p className="text-[10px] font-bold text-brand-primary uppercase mb-1">Performance Insight</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {rep.revenue > rep.target 
              ? `${rep.name} is exceeding targets by ${Math.round((rep.revenue/rep.target - 1) * 100)}%. Focus on high-value customers like ${rep.details.topCustomers[0].name}.`
              : `${rep.name} is at ${Math.round((rep.revenue/rep.target) * 100)}% of target. Increasing sales of ${rep.details.topProducts[0].name} could close the gap.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SalesTable = ({ 
  data, 
  onEditTarget, 
  filterKey, 
  isAllProducts,
  teams,
  selectedTeamId,
  onSelectTeam,
  onSaveTeam,
  onUpdateTeam,
  onDeleteTeam,
  onExport
}: SalesTableProps) => {
  const [search, setSearch] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedRepIds, setSelectedRepIds] = useState<Set<string>>(new Set());

  // Sync selection with selected team
  React.useEffect(() => {
    const activeTeam = teams.find(t => t.id === selectedTeamId);
    if (activeTeam && activeTeam.id !== "all-reps") {
      setSelectedRepIds(new Set(activeTeam.repIds));
    } else {
      setSelectedRepIds(new Set());
    }
  }, [selectedTeamId, teams]);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleRepSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedRepIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRepIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedRepIds.size === filteredData.length) {
      setSelectedRepIds(new Set());
    } else {
      setSelectedRepIds(new Set(filteredData.map(r => r.id)));
    }
  };

  const filteredData = data.filter(rep => 
    rep.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeTeam = teams.find(t => t.id === selectedTeamId);
  const isCustomTeam = activeTeam && activeTeam.id !== "all-reps";
  
  // Check if current selection differs from saved team members
  const hasSelectionChanges = isCustomTeam && (
    selectedRepIds.size !== activeTeam.repIds.length || 
    !activeTeam.repIds.every(id => selectedRepIds.has(id))
  );

  return (
    <div className="bg-bg-card rounded-2xl border border-border-main shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-main flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-text-main">Sales Performance Card</h3>
          <p className="text-xs text-text-muted">Comprehensive revenue tracking and representative drill-down.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Team Selection Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <select 
                value={selectedTeamId}
                onChange={(e) => onSelectTeam(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2 bg-slate-900 border border-border-main rounded-xl text-xs font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all cursor-pointer uppercase tracking-wider"
              >
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
              <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {isCustomTeam ? (
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onUpdateTeam(activeTeam.id, activeTeam.name, Array.from(selectedRepIds))}
                  disabled={!hasSelectionChanges}
                  title="Save changes to team members"
                  className={cn(
                    "p-2 rounded-xl border border-border-main transition-all",
                    hasSelectionChanges 
                      ? "bg-brand-primary/10 text-brand-primary border-brand-primary/50 hover:bg-brand-primary/20" 
                      : "text-slate-600 cursor-not-allowed"
                  )}
                >
                  <Save size={16} />
                </button>
                <button 
                  onClick={() => onSaveTeam(activeTeam.name, Array.from(selectedRepIds))}
                  title="Rename Team"
                  className="p-2 text-slate-400 hover:bg-slate-800 rounded-xl border border-border-main transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDeleteTeam(activeTeam.id)}
                  title="Delete Team"
                  className="p-2 text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl border border-border-main hover:border-rose-500/50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  onSelectTeam("all-reps");
                  setSelectedRepIds(new Set());
                  // This will trigger the "Save as Team" flow if they select reps
                }}
                title="Create New Team"
                className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-xl border border-border-main hover:border-brand-primary/50 transition-colors"
              >
                <Plus size={18} />
              </button>
            )}
          </div>

          {!isCustomTeam && selectedRepIds.size > 0 && (
            <button 
              onClick={() => onSaveTeam("", Array.from(selectedRepIds))}
              className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-bg-main text-xs font-bold rounded-xl hover:bg-brand-accent transition-all shadow-lg shadow-brand-primary/20"
            >
              <PlusCircle size={14} />
              Save as Team ({selectedRepIds.size})
            </button>
          )}

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search reps..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-900 border border-border-main rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-text-main w-full sm:w-48"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-border-main">
              <th className="w-10 px-6 py-4">
                <button 
                  onClick={toggleSelectAll}
                  className="text-slate-500 hover:text-brand-primary transition-colors"
                >
                  {selectedRepIds.size === filteredData.length && filteredData.length > 0 
                    ? <CheckSquare size={18} className="text-brand-primary" /> 
                    : <Square size={18} />}
                </button>
              </th>
              <th className="w-10 px-2 py-4"></th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Sales Rep
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Orders</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Target</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pacing</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-main">
            {filteredData.map((rep) => {
              const pacing = Math.round((rep.revenue / rep.target) * 100);
              const isExpanded = expandedRows.has(rep.id);
              const isSelected = selectedRepIds.has(rep.id);
              
              return (
                <React.Fragment key={rep.id}>
                  <tr 
                    className={cn(
                      "hover:bg-slate-900/50 transition-colors group cursor-pointer",
                      isExpanded && "bg-slate-900/30",
                      isSelected && "bg-brand-primary/5"
                    )}
                    onClick={() => toggleRow(rep.id)}
                  >
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => toggleRepSelection(rep.id, e)}
                        className={cn(
                          "transition-colors",
                          isSelected ? "text-brand-primary" : "text-slate-700 group-hover:text-slate-500"
                        )}
                      >
                        {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                      </button>
                    </td>
                    <td className="px-2 py-4">
                      {isExpanded ? <ChevronUp size={16} className="text-brand-primary" /> : <ChevronDown size={16} className="text-slate-500" />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold border border-brand-primary/20">
                          {rep.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-text-main">{rep.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-text-main">{rep.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-text-main">{formatCurrency(rep.revenue)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-muted">{formatCurrency(rep.target)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden min-w-[60px]">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              pacing >= 100 ? "bg-emerald-500" : pacing >= 70 ? "bg-brand-primary" : "bg-amber-500"
                            )}
                            style={{ width: `${Math.min(pacing, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-text-muted">{pacing}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onExport(rep);
                          }}
                          title="Export Transactions"
                          className="p-1.5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all"
                        >
                          <Download size={16} />
                        </button>
                        {!isAllProducts && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditTarget(rep);
                            }}
                            className="px-3 py-1 text-[10px] font-bold text-brand-primary border border-brand-primary/20 rounded-md hover:bg-brand-primary/10 transition-colors"
                          >
                            Set Target
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-slate-900/20">
                        <div key={`${rep.id}-${filterKey}`}>
                          <RepDetails rep={rep} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-border-main flex items-center justify-between bg-slate-900/30">
        <p className="text-xs text-text-muted">Showing {filteredData.length} of {data.length} representatives</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-900 border border-border-main rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors">Previous</button>
          <button className="px-3 py-1.5 text-xs font-semibold text-bg-main bg-brand-primary rounded-lg hover:bg-brand-accent transition-colors">1</button>
          <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-900 border border-border-main rounded-lg hover:bg-slate-800 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};
