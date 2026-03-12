import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  MessageSquare, 
  BarChart3, 
  Briefcase, 
  CheckSquare, 
  Ticket, 
  Megaphone, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "../utils/utils";
import { motion, AnimatePresence } from "motion/react";
import { SalesRepPerformance } from "../types/dashboard";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: string | number;
  onClick?: () => void;
  hasSubItems?: boolean;
  isExpanded?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, badge, onClick, hasSubItems, isExpanded }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
      active 
        ? "bg-brand-primary/10 text-brand-primary font-semibold" 
        : "text-text-muted hover:bg-slate-800 hover:text-text-main"
    )}
  >
    <Icon size={20} className={cn(active ? "text-brand-primary" : "text-slate-500 group-hover:text-slate-300")} />
    <span className="text-sm truncate flex-1 text-left">{label}</span>
    {badge && (
      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full font-semibold">
        {badge}
      </span>
    )}
    {hasSubItems && (
      isExpanded ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />
    )}
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  title: string;
  subtitle: string;
  reps: SalesRepPerformance[];
}

export const DashboardLayout = ({ children, activeTab, onTabChange, title, subtitle, reps }: DashboardLayoutProps) => {
  const [isRepsExpanded, setIsRepsExpanded] = useState(activeTab.startsWith("sales-rep"));

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden font-sans text-text-main">
      {/* Sidebar */}
      <aside className="w-52 bg-bg-sidebar border-r border-border-main flex flex-col relative z-30">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-bg-main font-bold">
            H
          </div>
          <span className="font-bold text-xl tracking-tight">Hemper</span>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-3 mb-2">
              Main
            </p>
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard Overview" 
              active={activeTab === "overview"} 
              onClick={() => onTabChange("overview")}
            />
            
            <div className="space-y-1">
              <SidebarItem 
                icon={Users} 
                label="Sales Rep" 
                active={activeTab.startsWith("sales-rep")} 
                onClick={() => setIsRepsExpanded(!isRepsExpanded)}
                hasSubItems
                isExpanded={isRepsExpanded}
              />
              
              <AnimatePresence>
                {isRepsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 space-y-1"
                  >
                    {reps.map(rep => (
                      <button
                        key={rep.id}
                        onClick={() => onTabChange(`sales-rep:${rep.id}`)}
                        className={cn(
                          "flex items-center w-full gap-2 px-3 py-2 rounded-lg text-xs transition-colors",
                          activeTab === `sales-rep:${rep.id}`
                            ? "text-brand-primary font-bold bg-brand-primary/5"
                            : "text-text-muted hover:text-text-main hover:bg-slate-800"
                        )}
                      >
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          activeTab === `sales-rep:${rep.id}` ? "bg-brand-primary" : "bg-slate-700"
                        )} />
                        <span className="truncate">{rep.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-border-main space-y-1">
          <SidebarItem icon={Settings} label="System Settings" />
          <SidebarItem icon={HelpCircle} label="Documentation" />
          
          <div className="mt-4 p-3 rounded-xl bg-slate-900 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Contact size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">Admin User</p>
              <p className="text-[10px] text-text-muted truncate">Hemper HQ</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-bg-sidebar border-b border-border-main flex items-center justify-between px-8 shrink-0 z-20">
          <div>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-xs text-text-muted">{subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-text-main hover:bg-slate-900 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full border-2 border-bg-sidebar"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-bg-main">
          {children}
        </div>
      </main>
    </div>
  );
};
