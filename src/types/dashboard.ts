export interface SalesRepPerformance {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  target: number;
  conesTarget: number;
  nonConesTarget: number;
  topProduct: string;
  customerCount: number;
  details?: {
    topCustomers: { name: string; revenue: number }[];
    topProducts: { name: string; sales: number }[];
    salesTrend: TrendData[];
    customerAcquisition: CustomerAcquisition[];
  };
  targetPlan?: MonthlyTargetPlan[];
}

export interface MonthlyTargetPlan {
  month: string;
  target: number;
  newAccountsWeek: number;
  newAccountsMonth: number;
  actual: number;
}

export interface CustomerAcquisition {
  month: string;
  newCustomers: number;
  oldCustomers: number;
}

export interface KPIStats {
  totalRevenue: number;
  revenueTrend: number;
  totalOrders: number;
  ordersTrend: number;
  customerCount: number;
  customerTrend: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface TrendData {
  date: string;
  revenue: number;
}
