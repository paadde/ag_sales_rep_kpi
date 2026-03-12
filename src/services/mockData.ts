import { SalesRepPerformance, KPIStats, TrendData, ChartData, CustomerAcquisition } from "../types/dashboard";

export let MOCK_REPS: SalesRepPerformance[] = [
  {
    id: "1",
    name: "John Hagemann",
    orders: 142,
    revenue: 12450.85,
    target: 15000,
    conesTarget: 2250,
    nonConesTarget: 12750,
    topProduct: "HEMPER Snail XL Bong",
    customerCount: 45,
    details: {
      topCustomers: [
        { name: "Cloud Nine Smoke Shop", revenue: 4500 },
        { name: "Vape Haven", revenue: 3200 },
        { name: "Green Leaf Dispensary", revenue: 2100 },
      ],
      topProducts: [
        { name: "HEMPER Snail XL Bong", sales: 45 },
        { name: "RIPNDIP x HEMPER Nermal UFO", sales: 32 },
        { name: "Ghost XL Rig", sales: 15 },
      ],
      salesTrend: [
        { date: "Mon", revenue: 1200 },
        { date: "Tue", revenue: 1500 },
        { date: "Wed", revenue: 1100 },
        { date: "Thu", revenue: 1800 },
        { date: "Fri", revenue: 2200 },
        { date: "Sat", revenue: 1400 },
        { date: "Sun", revenue: 1250 },
      ],
      customerAcquisition: [
        { month: "Jan", newCustomers: 12, oldCustomers: 33 },
        { month: "Feb", newCustomers: 15, oldCustomers: 30 },
      ]
    },
    targetPlan: [
      { month: "Mar 2026", target: 20000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 12450.85 },
      { month: "Apr 2026", target: 35000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "May 2026", target: 60000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Jun 2026", target: 75000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Jul 2026", target: 100000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Aug 2026", target: 125000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Sep 2026", target: 150000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Oct 2026", target: 200000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Nov 2026", target: 200000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
      { month: "Dec 2026", target: 235000, newAccountsWeek: 2, newAccountsMonth: 8, actual: 0 },
    ]
  },
  {
    id: "2",
    name: "Matt Picker",
    orders: 98,
    revenue: 8340.50,
    target: 10000,
    conesTarget: 1500,
    nonConesTarget: 8500,
    topProduct: "RIPNDIP x HEMPER Nermal UFO",
    customerCount: 32,
    details: {
      topCustomers: [
        { name: "High Times", revenue: 3500 },
        { name: "The Joint", revenue: 2800 },
        { name: "Buds & Blooms", revenue: 1500 },
      ],
      topProducts: [
        { name: "RIPNDIP x HEMPER Nermal UFO", sales: 28 },
        { name: "HEMPER Snail XL Bong", sales: 20 },
        { name: "Ghost XL Rig", sales: 12 },
      ],
      salesTrend: [
        { date: "Mon", revenue: 800 },
        { date: "Tue", revenue: 950 },
        { date: "Wed", revenue: 1200 },
        { date: "Thu", revenue: 1100 },
        { date: "Fri", revenue: 1500 },
        { date: "Sat", revenue: 1300 },
        { date: "Sun", revenue: 1490 },
      ],
      customerAcquisition: [
        { month: "Jan", newCustomers: 8, oldCustomers: 24 },
        { month: "Feb", newCustomers: 10, oldCustomers: 22 },
      ]
    },
    targetPlan: [
      { month: "Mar 2026", target: 15000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 8340.50 },
      { month: "Apr 2026", target: 20000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "May 2026", target: 25000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jun 2026", target: 30000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jul 2026", target: 35000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Aug 2026", target: 40000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Sep 2026", target: 45000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Oct 2026", target: 50000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Nov 2026", target: 55000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Dec 2026", target: 60000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
    ]
  },
  {
    id: "3",
    name: "tony.t",
    orders: 76,
    revenue: 6120.25,
    target: 8000,
    conesTarget: 1200,
    nonConesTarget: 6800,
    topProduct: "Totally Rad Arcade Bong",
    customerCount: 28,
    targetPlan: [
      { month: "Mar 2026", target: 10000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 6120.25 },
      { month: "Apr 2026", target: 12000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "May 2026", target: 14000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jun 2026", target: 16000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jul 2026", target: 18000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Aug 2026", target: 20000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Sep 2026", target: 22000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Oct 2026", target: 24000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Nov 2026", target: 26000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Dec 2026", target: 28000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
    ]
  },
  {
    id: "4",
    name: "Adam Duke",
    orders: 54,
    revenue: 4890.00,
    target: 6000,
    conesTarget: 900,
    nonConesTarget: 5100,
    topProduct: "Hemper - Weedbrick Bong",
    customerCount: 19,
    targetPlan: [
      { month: "Mar 2026", target: 8000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 4890.00 },
      { month: "Apr 2026", target: 9000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "May 2026", target: 10000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jun 2026", target: 11000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Jul 2026", target: 12000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Aug 2026", target: 13000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Sep 2026", target: 14000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Oct 2026", target: 15000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Nov 2026", target: 16000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
      { month: "Dec 2026", target: 17000, newAccountsWeek: 1, newAccountsMonth: 4, actual: 0 },
    ]
  },
  {
    id: "5",
    name: "Jason Cruz",
    orders: 42,
    revenue: 3560.75,
    target: 5000,
    conesTarget: 750,
    nonConesTarget: 4250,
    topProduct: "Ghost XL Rig",
    customerCount: 15,
    targetPlan: [
      { month: "Mar 2026", target: 6000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 3560.75 },
      { month: "Apr 2026", target: 7000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "May 2026", target: 8000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Jun 2026", target: 9000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Jul 2026", target: 10000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Aug 2026", target: 11000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Sep 2026", target: 12000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Oct 2026", target: 13000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Nov 2026", target: 14000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Dec 2026", target: 15000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
    ]
  },
  {
    id: "6",
    name: "Sandi Cash-Earl",
    orders: 38,
    revenue: 2980.40,
    target: 4000,
    conesTarget: 600,
    nonConesTarget: 3400,
    topProduct: "Shipping",
    customerCount: 12,
    targetPlan: [
      { month: "Mar 2026", target: 5000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 2980.40 },
      { month: "Apr 2026", target: 6000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "May 2026", target: 7000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Jun 2026", target: 8000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Jul 2026", target: 9000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Aug 2026", target: 10000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Sep 2026", target: 11000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Oct 2026", target: 12000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Nov 2026", target: 13000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
      { month: "Dec 2026", target: 14000, newAccountsWeek: 0, newAccountsMonth: 0, actual: 0 },
    ]
  },
];

export const getMonthlyRevenue = (repId: string, year: number, month: number, states: string[]): number => {
  const rep = MOCK_REPS.find(r => r.id === repId);
  if (!rep) return 0;

  // Simulate monthly revenue based on rep's base revenue and some randomness
  // month is 0-indexed (0 = Jan, 11 = Dec)
  const seed = repId.charCodeAt(0) + year + month + states.join("").length;
  const baseMonthly = rep.revenue / 12;
  
  // State multiplier
  let stateMultiplier = 0;
  if (states.includes("done")) stateMultiplier += 0.6;
  if (states.includes("processing")) stateMultiplier += 0.25;
  if (states.includes("confirmed")) stateMultiplier += 0.15;
  if (states.length === 0) stateMultiplier = 1.0; // Default to all if none selected for this specific view

  const randomFactor = 0.8 + (seed % 40) / 100; // 0.8 to 1.2
  
  // If it's a future month relative to "today" (Mar 2026), return 0 or lower values
  const currentYear = 2026;
  const currentMonth = 2; // March
  
  if (year > currentYear || (year === currentYear && month > currentMonth)) {
    return 0;
  }

  return baseMonthly * stateMultiplier * randomFactor;
};

export const getRepTransactions = (repId: string) => {
  const rep = MOCK_REPS.find(r => r.id === repId);
  if (!rep) return [];

  // Generate mock transactions
  const statuses = ["done", "confirmed", "processing"];
  const products = [
    "HEMPER Snail XL Bong", 
    "RIPNDIP x HEMPER Nermal UFO", 
    "Ghost XL Rig", 
    "Totally Rad Arcade Bong",
    "Hemper - Weedbrick Bong"
  ];
  
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `TX-${repId}-${i}`,
    date: new Date(2026, 2, 12 - i).toLocaleDateString(),
    customer: ["Cloud Nine Smoke Shop", "Vape Haven", "Green Leaf Dispensary", "High Times", "The Joint"][i % 5],
    product: products[i % products.length],
    amount: 150 + (Math.random() * 500),
    status: statuses[i % statuses.length]
  }));
};

export const updateRepTarget = (id: string, newTarget: number, productFilter: string) => {
  MOCK_REPS = MOCK_REPS.map(rep => {
    if (rep.id !== id) return rep;
    
    const updatedRep = { ...rep };
    if (productFilter === "cones") {
      updatedRep.conesTarget = newTarget;
    } else if (productFilter === "non-cones") {
      updatedRep.nonConesTarget = newTarget;
    }
    updatedRep.target = updatedRep.conesTarget + updatedRep.nonConesTarget;
    return updatedRep;
  });
};

export const MOCK_ACQUISITION: CustomerAcquisition[] = [
  { month: "Sep 2020", newCustomers: 1, oldCustomers: 0 },
  { month: "Oct 2020", newCustomers: 1, oldCustomers: 1 },
  { month: "Nov 2020", newCustomers: 6, oldCustomers: 2 },
  { month: "Dec 2020", newCustomers: 85, oldCustomers: 8 },
];

export const MOCK_CUSTOMER_TYPES: ChartData[] = [
  { name: "New Customers", value: 75 },
  { name: "Old Customers", value: 25 },
];

export const MOCK_KPI: KPIStats = {
  totalRevenue: 45842.75,
  revenueTrend: 18.4,
  totalOrders: 450,
  ordersTrend: 12.5,
  customerCount: 191,
  customerTrend: 8.2,
};

export const MOCK_TREND: TrendData[] = [
  { date: "Jan 01", revenue: 4500 },
  { date: "Jan 05", revenue: 5200 },
  { date: "Jan 10", revenue: 4800 },
  { date: "Jan 15", revenue: 6100 },
  { date: "Jan 20", revenue: 5900 },
  { date: "Jan 25", revenue: 7200 },
];

export const MOCK_CHANNELS: ChartData[] = [
  { name: "Shopify", value: 65 },
  { name: "Dropshipping", value: 25 },
  { name: "Direct", value: 10 },
];

export const getFilteredReps = (productFilter: string, timeFilter: string, stateFilter: string[]): SalesRepPerformance[] => {
  // Simulate data changes based on filters
  let multiplier = 1.0;
  
  // Time filter multipliers (more distinct)
  if (timeFilter === "year") multiplier = 12.0;
  if (timeFilter === "month") multiplier = 1.0;
  if (timeFilter === "last-month") multiplier = 0.85; 
  if (timeFilter === "week") multiplier = 0.25;
  if (timeFilter === "last-week") multiplier = 0.18; 

  // Product filter multipliers
  let coneMultiplier = 1.0;
  if (productFilter === "cones") coneMultiplier = 0.15; 
  if (productFilter === "non-cones") coneMultiplier = 0.85;

  // State filter simulation
  // 'done' = 60%, 'processing' = 25%, 'confirmed' = 15%
  let stateMultiplier = 0;
  if (stateFilter.includes("done")) stateMultiplier += 0.6;
  if (stateFilter.includes("processing")) stateMultiplier += 0.25;
  if (stateFilter.includes("confirmed")) stateMultiplier += 0.15;
  
  // If no states selected, show 0 (or we could default to all, but let's follow the filter)
  if (stateFilter.length === 0) stateMultiplier = 0;

  return MOCK_REPS.map(rep => {
    // Seed random based on rep ID and filters to keep it "stable" but different per filter
    const seed = rep.id.charCodeAt(0) + productFilter.length + timeFilter.length + stateFilter.join("").length;
    const randomFactor = 0.9 + (seed % 20) / 100; // 0.9 to 1.1 variability

    const adjustedRevenue = rep.revenue * multiplier * coneMultiplier * stateMultiplier * randomFactor;
    const adjustedOrders = Math.round(rep.orders * multiplier * coneMultiplier * stateMultiplier * randomFactor);
    
    // Target logic: Always sum cones and non-cones for the "all" view to ensure accuracy
    let baseTarget = rep.conesTarget + rep.nonConesTarget;
    if (productFilter === "cones") baseTarget = rep.conesTarget;
    if (productFilter === "non-cones") baseTarget = rep.nonConesTarget;
    
    const adjustedTarget = baseTarget * multiplier; 

    // Generate dynamic sales trend based on time filter
    let dynamicTrend: TrendData[] = [];
    if (timeFilter === "year") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      dynamicTrend = months.map((m, idx) => ({
        date: m,
        revenue: (adjustedRevenue / 12) * (0.7 + ((seed + idx) % 60) / 100)
      }));
    } else if (timeFilter === "month" || timeFilter === "last-month") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
      dynamicTrend = weeks.map((w, idx) => ({
        date: w,
        revenue: (adjustedRevenue / 4) * (0.8 + ((seed + idx) % 40) / 100)
      }));
    } else {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      dynamicTrend = days.map((d, idx) => ({
        date: d,
        revenue: (adjustedRevenue / 7) * (0.6 + ((seed + idx) % 80) / 100)
      }));
    }

    return {
      ...rep,
      revenue: adjustedRevenue,
      orders: adjustedOrders,
      target: adjustedTarget,
      details: rep.details ? {
        ...rep.details,
        salesTrend: dynamicTrend,
        topCustomers: rep.details.topCustomers.map((c, idx) => ({
          ...c,
          revenue: c.revenue * multiplier * coneMultiplier * stateMultiplier * (0.9 + ((seed + idx) % 20) / 100)
        })),
        topProducts: rep.details.topProducts.map((p, idx) => ({
          ...p,
          sales: Math.round(p.sales * multiplier * coneMultiplier * stateMultiplier * (0.9 + ((seed + idx) % 20) / 100))
        }))
      } : undefined
    };
  });
};
