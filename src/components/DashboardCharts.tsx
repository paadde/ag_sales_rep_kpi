import React from "react";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, MousePointer2 } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "../utils/utils";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar,
  Cell,
  PieChart,
  Pie,
  CartesianGrid,
  Legend
} from "recharts";
import { KPIStats, TrendData, ChartData, CustomerAcquisition } from "../types/dashboard";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ElementType;
  color: string;
}

export const KPICard = ({ title, value, trend, icon: Icon, color }: KPICardProps) => {
  const isPositive = trend >= 0;

  return (
    <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", color)}>
          <Icon size={20} className="text-bg-main" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        )}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
        <h3 className="text-2xl font-bold tracking-tight text-text-main">{value}</h3>
      </div>
    </div>
  );
};

export const RevenueTrendChart = ({ data }: { data: TrendData[] }) => (
  <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm h-[350px] flex flex-col">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="font-bold text-text-main">Revenue Trend</h3>
        <p className="text-xs text-text-muted">Daily performance tracking</p>
      </div>
      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
          <span className="text-text-muted">Revenue</span>
        </div>
      </div>
    </div>
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#64748b' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f172a' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const CustomerAcquisitionChart = ({ data }: { data: CustomerAcquisition[] }) => (
  <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm h-[350px] flex flex-col">
    <div className="mb-6">
      <h3 className="font-bold text-text-main">Customer Acquisition</h3>
      <p className="text-xs text-text-muted">New vs Returning customers by month.</p>
    </div>
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 10 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748b", fontSize: 10 }} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", fontSize: "12px" }}
            itemStyle={{ padding: "2px 0" }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />
          <Bar dataKey="newCustomers" name="New Customers" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="oldCustomers" name="Old Customers" fill="#334155" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const DistributionChart = ({ data, title }: { data: ChartData[], title: string }) => {
  const COLORS = ['#10b981', '#34d399', '#059669', '#065f46'];

  return (
    <div className="bg-bg-card p-6 rounded-2xl border border-border-main shadow-sm h-[350px] flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-text-main">{title}</h3>
        <p className="text-xs text-text-muted">Breakdown by percentage</p>
      </div>
      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</p>
            <p className="text-xl font-bold text-text-main">100%</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, i) => (
          <div key={item.name} className="text-left">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{item.name}</div>
            <div className="text-sm font-bold text-text-main">{item.value}%</div>
            <div className={cn("h-1 w-full rounded-full mt-1", i === 0 ? "bg-emerald-500" : i === 1 ? "bg-emerald-400" : "bg-emerald-600")}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
