import React, { useState } from "react";
import { 
  QueryClient, 
  QueryClientProvider, 
  useQuery, 
  useMutation, 
  useQueryClient 
} from "@tanstack/react-query";
import { 
  AlertCircle,
  Loader2,
  TrendingUp,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DashboardLayout } from "./components/DashboardLayout";
import { SalesTable } from "./components/SalesTable";
import { TargetEditorModal } from "./components/TargetEditorModal";
import { StateFilter } from "./components/StateFilter";
import { SaveTeamModal } from "./components/SaveTeamModal";
import { RepFilter } from "./components/RepFilter";
import { SalesRepTab } from "./components/SalesRepTab";
import { getFilteredReps, updateRepTarget } from "./services/mockData";
import { exportRepTransactions } from "./services/exportService";
import { formatCurrency, cn, getDateRange } from "./utils/utils";
import { Toaster, toast } from "sonner";
import { SalesRepPerformance } from "./types/dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const DashboardOverview = ({ 
  reps, 
  isLoading, 
  isError, 
  productFilter, 
  setProductFilter, 
  timeFilter, 
  setTimeFilter, 
  stateFilter, 
  setStateFilter,
  selectedRepIdsFilter,
  setSelectedRepIdsFilter,
  teams,
  selectedTeamId,
  setSelectedTeamId,
  handleCreateTeam,
  handleUpdateTeamMembers,
  handleDeleteTeam,
  handleEditTarget,
  filteredReps
}: any) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 size={40} className="text-brand-primary animate-spin" />
        <p className="text-sm font-medium text-text-muted">Loading Hemper Analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-4">
        <div className="p-4 bg-rose-500/10 rounded-full text-rose-500">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-xl font-bold text-text-main">System Error</h2>
        <p className="text-sm text-text-muted">We couldn't load the sales data. Please check your connection or contact the data team.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-brand-primary text-bg-main font-semibold rounded-xl hover:bg-brand-accent transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Filter Toggles - Improved Layout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-bg-card p-4 rounded-2xl border border-border-main shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-border-main">
            <button 
              onClick={() => setProductFilter("all")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                productFilter === "all" ? "bg-brand-primary text-bg-main shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              All Products
            </button>
            <button 
              onClick={() => setProductFilter("cones")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                productFilter === "cones" ? "bg-brand-primary text-bg-main shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Cones
            </button>
            <button 
              onClick={() => setProductFilter("non-cones")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                productFilter === "non-cones" ? "bg-brand-primary text-bg-main shadow-lg" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Non-Cones
            </button>
          </div>
          
          <StateFilter selectedStates={stateFilter} onChange={setStateFilter} />
          <RepFilter reps={reps || []} selectedRepIds={selectedRepIdsFilter} onChange={setSelectedRepIdsFilter} />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "year", label: "Year" },
              { id: "month", label: "Month" },
              { id: "last-month", label: "Last Month" },
              { id: "week", label: "Week" },
              { id: "last-week", label: "Last Week" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeFilter(range.id as any)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all",
                  timeFilter === range.id 
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-sm shadow-emerald-500/10" 
                    : "bg-slate-900 border-border-main text-slate-500 hover:border-slate-700 hover:text-slate-300"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="px-4 py-1.5 bg-emerald-500/5 rounded-xl border border-emerald-500/20 shadow-sm shadow-emerald-500/5">
            <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">
              {getDateRange(timeFilter)}
            </p>
          </div>
        </div>
      </div>

      {/* Sales Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Sales</p>
          <h3 className="text-2xl font-bold text-text-main">
            {formatCurrency(filteredReps?.reduce((acc: number, curr: any) => acc + curr.revenue, 0) || 0)}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
            <TrendingUp size={12} />
            <span>Across {selectedTeamId === 'all-reps' ? 'all' : 'selected'} representatives</span>
          </div>
        </div>
        <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Target</p>
          <h3 className="text-2xl font-bold text-text-main">
            {formatCurrency(filteredReps?.reduce((acc: number, curr: any) => acc + curr.target, 0) || 0)}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-brand-primary">
            <Target size={12} />
            <span>Combined performance goal</span>
          </div>
        </div>
        <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pacing to Goal</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-text-main">
              {(() => {
                const totalSales = filteredReps?.reduce((acc: number, curr: any) => acc + curr.revenue, 0) || 0;
                const totalTarget = filteredReps?.reduce((acc: number, curr: any) => acc + curr.target, 0) || 1;
                return Math.round((totalSales / totalTarget) * 100);
              })()}%
            </h3>
            <span className="text-[10px] font-bold text-slate-500 mb-1">Achievement</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min(100, (() => {
                  const totalSales = filteredReps?.reduce((acc: number, curr: any) => acc + curr.revenue, 0) || 0;
                  const totalTarget = filteredReps?.reduce((acc: number, curr: any) => acc + curr.target, 0) || 1;
                  return (totalSales / totalTarget) * 100;
                })())}%` 
              }}
              transition={{ duration: 1 }}
              className="h-full bg-brand-primary rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Sales Performance Card */}
      <div className="w-full">
        <SalesTable 
          data={filteredReps || []} 
          onEditTarget={handleEditTarget} 
          filterKey={`${productFilter}-${timeFilter}-${selectedTeamId}-${selectedRepIdsFilter.join(',')}`}
          isAllProducts={productFilter === "all"}
          teams={teams}
          selectedTeamId={selectedTeamId}
          onSelectTeam={setSelectedTeamId}
          onSaveTeam={handleCreateTeam}
          onUpdateTeam={handleUpdateTeamMembers}
          onDeleteTeam={handleDeleteTeam}
          onExport={exportRepTransactions}
        />
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [selectedRep, setSelectedRep] = useState<SalesRepPerformance | null>(null);
  const [productFilter, setProductFilter] = useState<"all" | "cones" | "non-cones">("all");
  const [timeFilter, setTimeFilter] = useState<"year" | "month" | "last-month" | "week" | "last-week">("month");
  const [stateFilter, setStateFilter] = useState<string[]>(["done", "processing", "confirmed"]);
  const [selectedRepIdsFilter, setSelectedRepIdsFilter] = useState<string[]>([]);
  
  // Team Management
  const [teams, setTeams] = useState<{id: string, name: string, repIds: string[]}[]>([
    { id: "all-reps", name: "All Representatives", repIds: [] }
  ]);
  const [selectedTeamId, setSelectedTeamId] = useState("all-reps");
  const [isSaveTeamModalOpen, setIsSaveTeamModalOpen] = useState(false);
  const [pendingTeamRepIds, setPendingTeamRepIds] = useState<string[]>([]);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);

  // Simulation of data fetching
  const { data: reps, isLoading: isLoadingReps, isError: isErrorReps } = useQuery({
    queryKey: ["reps", productFilter, timeFilter, stateFilter],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return getFilteredReps(productFilter, timeFilter, stateFilter);
    },
  });

  // Filter reps based on selected team AND individual rep filter
  const filteredReps = React.useMemo(() => {
    if (!reps) return [];
    
    let result = reps;

    // Apply team filter
    const activeTeam = teams.find(t => t.id === selectedTeamId);
    if (activeTeam && activeTeam.id !== "all-reps" && activeTeam.repIds.length > 0) {
      result = result.filter(rep => activeTeam.repIds.includes(rep.id));
    }

    // Apply individual rep filter
    if (selectedRepIdsFilter.length > 0) {
      result = result.filter(rep => selectedRepIdsFilter.includes(rep.id));
    }

    return result;
  }, [reps, selectedTeamId, teams, selectedRepIdsFilter]);

  const handleEditTarget = (rep: SalesRepPerformance) => {
    setSelectedRep(rep);
    setIsTargetModalOpen(true);
  };

  const handleSaveTarget = async (newTarget: number) => {
    if (!selectedRep) return;
    
    // Simulation of mutation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update the master mock data
    updateRepTarget(selectedRep.id, newTarget, productFilter);
    
    // Invalidate all rep queries to ensure consistency across all views (All/Cones/Non-Cones)
    queryClient.invalidateQueries({ queryKey: ["reps"] });

    toast.success("Target updated", {
      description: `New target for ${selectedRep.name} (${productFilter}) set to ${formatCurrency(newTarget)}`,
    });
  };

  const handleCreateTeam = (name: string, repIds: string[]) => {
    setPendingTeamRepIds(repIds);
    // If name is provided, we are renaming. If not, we are creating.
    const teamToEdit = teams.find(t => t.name === name && t.id !== "all-reps");
    if (teamToEdit) {
      setEditingTeamId(teamToEdit.id);
    } else {
      setEditingTeamId(null);
    }
    setIsSaveTeamModalOpen(true);
  };

  const handleSaveTeam = (name: string) => {
    if (editingTeamId) {
      // Rename existing team
      setTeams(teams.map(t => t.id === editingTeamId ? { ...t, name } : t));
      toast.success("Team Renamed", {
        description: `Team has been renamed to "${name}".`,
      });
    } else {
      // Create new team
      const newTeam = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        repIds: pendingTeamRepIds
      };
      setTeams([...teams, newTeam]);
      setSelectedTeamId(newTeam.id);
      toast.success("Team Created", {
        description: `New team "${name}" has been saved.`,
      });
    }
    setIsSaveTeamModalOpen(false);
    setEditingTeamId(null);
  };

  const handleUpdateTeamMembers = (id: string, name: string, repIds: string[]) => {
    setTeams(teams.map(t => t.id === id ? { ...t, repIds } : t));
    toast.success("Team Updated", {
      description: `Member selection for "${name}" has been updated.`,
    });
  };

  const handleDeleteTeam = (id: string) => {
    if (confirm("Are you sure you want to delete this team?")) {
      setTeams(teams.filter(t => t.id !== id));
      setSelectedTeamId("all-reps");
      toast.success("Team Deleted");
    }
  };

  const selectedRepId = activeTab.startsWith("sales-rep:") ? activeTab.split(":")[1] : null;
  const selectedRepName = reps?.find(r => r.id === selectedRepId)?.name;

  const currentTitle = activeTab === "overview" 
    ? "Sales Overview" 
    : (selectedRepName || "Sales Representative Planning");
    
  const currentSubtitle = activeTab === "overview" 
    ? "Real-time performance and pipeline tracking." 
    : "Sales Representative Performance Profile";

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      title={currentTitle}
      subtitle={currentSubtitle}
      reps={reps || []}
    >
      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DashboardOverview 
              reps={reps}
              isLoading={isLoadingReps}
              isError={isErrorReps}
              productFilter={productFilter}
              setProductFilter={setProductFilter}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              selectedRepIdsFilter={selectedRepIdsFilter}
              setSelectedRepIdsFilter={setSelectedRepIdsFilter}
              teams={teams}
              selectedTeamId={selectedTeamId}
              setSelectedTeamId={setSelectedTeamId}
              handleCreateTeam={handleCreateTeam}
              handleUpdateTeamMembers={handleUpdateTeamMembers}
              handleDeleteTeam={handleDeleteTeam}
              handleEditTarget={handleEditTarget}
              filteredReps={filteredReps}
            />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SalesRepTab 
              reps={reps || []} 
              initialRepId={activeTab.split(":")[1]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals and Toaster */}
      <TargetEditorModal 
        isOpen={isTargetModalOpen} 
        onClose={() => setIsTargetModalOpen(false)} 
        onSubmit={handleSaveTarget}
        rep={selectedRep}
      />

      <SaveTeamModal 
        isOpen={isSaveTeamModalOpen}
        onClose={() => {
          setIsSaveTeamModalOpen(false);
          setEditingTeamId(null);
        }}
        onSave={handleSaveTeam}
        repCount={pendingTeamRepIds.length}
        initialName={editingTeamId ? teams.find(t => t.id === editingTeamId)?.name : ""}
        mode={editingTeamId ? "edit" : "create"}
      />
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
      <Toaster position="top-right" theme="dark" closeButton />
    </QueryClientProvider>
  );
}
