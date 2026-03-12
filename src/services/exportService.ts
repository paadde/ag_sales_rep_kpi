import { SalesRepPerformance } from "../types/dashboard";

export const exportRepTransactions = (rep: SalesRepPerformance) => {
  // Mock transaction data based on the rep's performance
  // In a real app, this would fetch from a database or use the CSV file mentioned
  const transactions = [];
  const states = ['done', 'processing', 'confirmed'];
  const products = rep.details?.topProducts.map(p => p.name) || ["HEMPER Snail XL Bong", "RIPNDIP x HEMPER Nermal UFO"];
  
  // Generate mock transactions to match the rep's order count
  for (let i = 0; i < rep.orders; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      id: `TRX-${rep.id}-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      customer: rep.details?.topCustomers[i % 3].name || "Retail Customer",
      product: products[i % products.length],
      amount: (rep.revenue / rep.orders) * (0.8 + Math.random() * 0.4),
      state: states[Math.floor(Math.random() * states.length)]
    });
  }

  // Convert to CSV
  const headers = ["Transaction ID", "Date", "Customer", "Product", "Amount", "State"];
  const csvRows = [
    headers.join(","),
    ...transactions.map(t => [
      t.id,
      t.date,
      `"${t.customer}"`,
      `"${t.product}"`,
      t.amount.toFixed(2),
      t.state
    ].join(","))
  ];

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${rep.name.replace(/\s+/g, '_')}_Transactions.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
