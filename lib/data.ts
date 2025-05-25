// Mock data utility functions for demonstration purposes
// In a real application, these would fetch from an API or database

// Mock dashboard statistics
export async function fetchDashboardStats() {
  // Simulate network delay for streaming demonstration
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    totalReports: 32,
    newReportsPercent: 15,
    activeReports: 24,
    activeReportsPercent: 12,
    dataSources: 7,
    dataSourcesPercent: 5,
    chartsCreated: 124,
    chartsCreatedPercent: 22,
    overviewData: [
      { name: "Jan", total: 12 },
      { name: "Feb", total: 18 },
      { name: "Mar", total: 24 },
      { name: "Apr", total: 19 },
      { name: "May", total: 28 },
      { name: "Jun", total: 25 },
      { name: "Jul", total: 32 },
    ],
    recentActivity: [
      {
        id: "1",
        name: "Alex Thompson",
        email: "alex@example.com",
        amount: "$2,500.00",
        action: "Created report",
        date: "2 hours ago",
      },
      {
        id: "2",
        name: "Maria Garcia",
        email: "maria@example.com",
        amount: "$1,800.00",
        action: "Edited report",
        date: "5 hours ago",
      },
      {
        id: "3",
        name: "Olivia Chen",
        email: "olivia@example.com",
        amount: "$3,200.00",
        action: "Shared report",
        date: "Yesterday",
      },
      {
        id: "4",
        name: "James Wilson",
        email: "james@example.com",
        amount: "$1,300.00",
        action: "Viewed report",
        date: "Yesterday",
      },
      {
        id: "5",
        name: "Sophia Kim",
        email: "sophia@example.com",
        amount: "$2,100.00",
        action: "Exported report",
        date: "2 days ago",
      },
    ],
  };
}

// Mock recent reports with data sources
export async function fetchRecentReports() {
  // Simulate network delay for streaming demonstration
  await new Promise(resolve => setTimeout(resolve, 700));

  return [
    {
      id: "report-001",
      title: "Q2 Sales Performance",
      primaryChartType: "bar",
      updatedAt: "2 hours ago",
      dataSources: [
        { id: "ds-001", name: "Sales API", type: "api" },
        { id: "ds-002", name: "CRM Database", type: "database" },
        { id: "ds-003", name: "Analytics Platform", type: "api" }
      ]
    },
    {
      id: "report-002",
      title: "Marketing Campaign ROI",
      primaryChartType: "line",
      updatedAt: "Yesterday",
      dataSources: [
        { id: "ds-004", name: "Marketing Analytics", type: "api" },
        { id: "ds-005", name: "Ad Platform", type: "api" }
      ]
    },
    {
      id: "report-003",
      title: "Customer Segmentation",
      primaryChartType: "pie",
      updatedAt: "3 days ago",
      dataSources: [
        { id: "ds-002", name: "CRM Database", type: "database" },
        { id: "ds-006", name: "Survey Results", type: "csv" }
      ]
    },
    {
      id: "report-004",
      title: "Product Performance Analysis",
      primaryChartType: "bar",
      updatedAt: "1 week ago",
      dataSources: [
        { id: "ds-007", name: "Product Database", type: "database" },
        { id: "ds-008", name: "Reviews API", type: "api" }
      ]
    },
    {
      id: "report-005",
      title: "Customer Satisfaction Survey",
      primaryChartType: "pie",
      updatedAt: "2 weeks ago",
      dataSources: [
        { id: "ds-006", name: "Survey Results", type: "csv" },
        { id: "ds-002", name: "CRM Database", type: "database" }
      ]
    },
    {
      id: "report-006",
      title: "Annual Financial Summary",
      primaryChartType: "line",
      updatedAt: "3 weeks ago",
      dataSources: [
        { id: "ds-009", name: "Financial Database", type: "database" },
        { id: "ds-010", name: "Accounting System", type: "api" }
      ]
    },
  ];
}

// Mock report data with multiple data sources
export async function fetchReportById(reportId: string) {
  // Simulate network delay for streaming demonstration
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Return different data based on reportId
  const baseReport = {
    id: reportId,
    title: "Performance Report",
    description: "Key performance indicators and metrics",
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-09-17T14:45:00Z",
    author: {
      name: "Alex Thompson",
      email: "alex@example.com",
    },
  };

  if (reportId === "report-001") {
    return {
      ...baseReport,
      title: "Q2 Sales Performance",
      description: "Quarterly sales performance across all regions",
      dataSources: [
        { id: "ds-001", name: "Sales API", type: "api" },
        { id: "ds-002", name: "CRM Database", type: "database" },
        { id: "ds-003", name: "Analytics Platform", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Revenue Overview",
          dataSource: "ds-001",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Monthly Revenue",
              dataSource: "ds-001",
              data: [
                { name: "Jan", value: 1200 },
                { name: "Feb", value: 1900 },
                { name: "Mar", value: 2400 },
                { name: "Apr", value: 1800 },
                { name: "May", value: 2800 },
                { name: "Jun", value: 3200 },
              ],
            },
            {
              id: "chart-2",
              type: "line",
              title: "Revenue Trend",
              dataSource: "ds-003",
              data: [
                { name: "Week 1", value: 300 },
                { name: "Week 2", value: 500 },
                { name: "Week 3", value: 700 },
                { name: "Week 4", value: 900 },
                { name: "Week 5", value: 800 },
                { name: "Week 6", value: 1100 },
                { name: "Week 7", value: 1300 },
                { name: "Week 8", value: 1500 },
              ],
            },
          ],
        },
        {
          id: "section-2",
          title: "Regional Breakdown",
          dataSource: "ds-002",
          charts: [
            {
              id: "chart-3",
              type: "pie",
              title: "Sales by Region",
              dataSource: "ds-002",
              data: [
                { name: "North America", value: 4200 },
                { name: "Europe", value: 3800 },
                { name: "Asia", value: 3100 },
                { name: "South America", value: 1800 },
                { name: "Africa", value: 1200 },
              ],
            },
          ],
        },
      ],
    };
  } else if (reportId === "report-002") {
    return {
      ...baseReport,
      title: "Marketing Campaign ROI",
      description: "Return on investment for recent marketing campaigns",
      dataSources: [
        { id: "ds-004", name: "Marketing Analytics", type: "api" },
        { id: "ds-005", name: "Ad Platform", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Campaign Performance",
          dataSource: "ds-004",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Campaign Costs",
              dataSource: "ds-004",
              data: [
                { name: "Social Media", value: 2200 },
                { name: "Email", value: 1500 },
                { name: "Content", value: 3000 },
                { name: "PPC", value: 4500 },
                { name: "Influencers", value: 3200 },
              ],
            },
            {
              id: "chart-2",
              type: "line",
              title: "ROI Over Time",
              dataSource: "ds-005",
              data: [
                { name: "Week 1", value: 1.2 },
                { name: "Week 2", value: 1.8 },
                { name: "Week 3", value: 2.3 },
                { name: "Week 4", value: 2.8 },
                { name: "Week 5", value: 3.1 },
                { name: "Week 6", value: 3.5 },
              ],
            },
          ],
        },
      ],
    };
  } else {
    return {
      ...baseReport,
      title: "Custom Report",
      description: "Custom report with sample data",
      dataSources: [
        { id: "ds-001", name: "Sample Data", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Overview",
          dataSource: "ds-001",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Sample Bar Chart",
              dataSource: "ds-001",
              data: [
                { name: "Category A", value: 1200 },
                { name: "Category B", value: 1900 },
                { name: "Category C", value: 2400 },
                { name: "Category D", value: 1800 },
                { name: "Category E", value: 2800 },
              ],
            },
          ],
        },
      ],
    };
  }
}

export async function fetchReportById2(reportId: string) {
  // Simulate network delay for streaming demonstration
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Return different data based on reportId
  const baseReport = {
    id: reportId,
    title: "Performance Report",
    description: "Key performance indicators and metrics",
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-09-17T14:45:00Z",
    author: {
      name: "Alex Thompson",
      email: "alex@example.com",
    },
  };

  if (reportId === "report-001") {
    return {
      ...baseReport,
      title: "Q2 Sales Performance",
      description: "Quarterly sales performance across all regions",
      dataSources: [
        { id: "ds-001", name: "Sales API", type: "api" },
        { id: "ds-002", name: "CRM Database", type: "database" },
        { id: "ds-003", name: "Analytics Platform", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Revenue Overview",
          dataSource: "ds-001",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Monthly Revenue",
              dataSource: "ds-001",
              data: [
                { name: "Jan", value: 1200 },
                { name: "Feb", value: 1900 },
                { name: "Mar", value: 2400 },
                { name: "Apr", value: 1800 },
                { name: "May", value: 2800 },
                { name: "Jun", value: 3200 },
              ],
            },
            {
              id: "chart-2",
              type: "line",
              title: "Revenue Trend",
              dataSource: "ds-003",
              data: [
                { name: "Week 1", value: 300 },
                { name: "Week 2", value: 500 },
                { name: "Week 3", value: 700 },
                { name: "Week 4", value: 900 },
                { name: "Week 5", value: 800 },
                { name: "Week 6", value: 1100 },
                { name: "Week 7", value: 1300 },
                { name: "Week 8", value: 1500 },
              ],
            },
          ],
        },
        {
          id: "section-2",
          title: "Regional Breakdown",
          dataSource: "ds-002",
          charts: [
            {
              id: "chart-3",
              type: "pie",
              title: "Sales by Region",
              dataSource: "ds-002",
              data: [
                { name: "North America", value: 4200 },
                { name: "Europe", value: 3800 },
                { name: "Asia", value: 3100 },
                { name: "South America", value: 1800 },
                { name: "Africa", value: 1200 },
              ],
            },
          ],
        },
      ],
    };
  } else if (reportId === "report-002") {
    return {
      ...baseReport,
      title: "Marketing Campaign ROI",
      description: "Return on investment for recent marketing campaigns",
      dataSources: [
        { id: "ds-004", name: "Marketing Analytics", type: "api" },
        { id: "ds-005", name: "Ad Platform", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Campaign Performance",
          dataSource: "ds-004",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Campaign Costs",
              dataSource: "ds-004",
              data: [
                { name: "Social Media", value: 2200 },
                { name: "Email", value: 1500 },
                { name: "Content", value: 3000 },
                { name: "PPC", value: 4500 },
                { name: "Influencers", value: 3200 },
              ],
            },
            {
              id: "chart-2",
              type: "line",
              title: "ROI Over Time",
              dataSource: "ds-005",
              data: [
                { name: "Week 1", value: 1.2 },
                { name: "Week 2", value: 1.8 },
                { name: "Week 3", value: 2.3 },
                { name: "Week 4", value: 2.8 },
                { name: "Week 5", value: 3.1 },
                { name: "Week 6", value: 3.5 },
              ],
            },
          ],
        },
      ],
    };
  } else {
    return {
      ...baseReport,
      title: "Custom Report",
      description: "Custom report with sample data",
      dataSources: [
        { id: "ds-001", name: "Sample Data", type: "api" }
      ],
      sections: [
        {
          id: "section-1",
          title: "Overview",
          dataSource: "ds-001",
          charts: [
            {
              id: "chart-1",
              type: "bar",
              title: "Sample Bar Chart",
              dataSource: "ds-001",
              data: [
                { name: "Category A", value: 1200 },
                { name: "Category B", value: 1900 },
                { name: "Category C", value: 2400 },
                { name: "Category D", value: 1800 },
                { name: "Category E", value: 2800 },
              ],
            },
          ],
        },
      ],
    };
  }
}


// Stream-enabled data fetch function for large datasets
export async function* streamReportData(reportId: string) {
  // Initial data burst
  yield {
    status: "loading",
    progress: 10,
    message: "Initializing data fetch",
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  yield {
    status: "loading",
    progress: 30,
    message: "Fetching metadata",
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  yield {
    status: "loading",
    progress: 50,
    message: "Processing chart data",
  };

  await new Promise(resolve => setTimeout(resolve, 700));

  yield {
    status: "loading",
    progress: 80,
    message: "Finalizing report",
  };

  await new Promise(resolve => setTimeout(resolve, 300));

  // Final data payload
  const report = await fetchReportById(reportId);

  yield {
    status: "complete",
    progress: 100,
    data: report,
  };
}

// New function to fetch all data sources
export async function fetchDataSources() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { id: "ds-001", name: "Sales API", type: "api" },
    { id: "ds-002", name: "CRM Database", type: "database" },
    { id: "ds-003", name: "Analytics Platform", type: "api" },
    { id: "ds-004", name: "Marketing Analytics", type: "api" },
    { id: "ds-005", name: "Ad Platform", type: "api" },
    { id: "ds-006", name: "Survey Results", type: "csv" },
    { id: "ds-007", name: "Product Database", type: "database" },
    { id: "ds-008", name: "Reviews API", type: "api" },
    { id: "ds-009", name: "Financial Database", type: "database" },
    { id: "ds-010", name: "Accounting System", type: "api" }
  ];
}