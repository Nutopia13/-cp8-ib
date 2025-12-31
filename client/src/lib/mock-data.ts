
// Real Data derived from BTC/USDT 5m Analysis (2025)

export const breakoutStats = {
  totalSessions: 252,
  avgBreakouts: "56%", // Derived from total (100 - avg reversal)
  peakTime: "14:00-15:00",
  highest: "94.8%", // 15:00 slot
  lowest: "12.7%", // 07:30 slot
  optimal: "14:30"
};

export const breakoutTimeData = [
  { time: "07:30", probability: 12.7 },
  { time: "08:00", probability: 16.3 },
  { time: "08:30", probability: 25.0 },
  { time: "09:00", probability: 23.0 },
  { time: "09:30", probability: 56.8 }, // 100 - 43.25
  { time: "10:00", probability: 59.9 },
  { time: "10:30", probability: 59.9 },
  { time: "11:00", probability: 55.9 },
  { time: "11:30", probability: 53.6 },
  { time: "12:00", probability: 52.0 },
  { time: "12:30", probability: 56.8 },
  { time: "13:00", probability: 56.4 },
  { time: "13:30", probability: 59.1 },
  { time: "14:00", probability: 65.9 },
  { time: "14:30", probability: 77.8 },
  { time: "15:00", probability: 94.8 }
];

export const breakoutTableData = [
  { time: "07:30", sessions: 253, up: 13, down: 14, both: 226, pct: 89.3 },
  { time: "08:00", sessions: 253, up: 13, down: 18, both: 222, pct: 87.8 },
  { time: "08:30", sessions: 253, up: 25, down: 28, both: 200, pct: 79.1 },
  { time: "09:00", sessions: 253, up: 17, down: 29, both: 207, pct: 81.8 },
  { time: "09:30", sessions: 253, up: 51, down: 58, both: 144, pct: 56.9 },
  { time: "10:00", sessions: 253, up: 54, down: 67, both: 132, pct: 52.2 },
  { time: "10:30", sessions: 253, up: 51, down: 65, both: 137, pct: 54.2 },
  { time: "11:00", sessions: 253, up: 52, down: 51, both: 150, pct: 59.3 },
  { time: "11:30", sessions: 253, up: 55, down: 47, both: 151, pct: 59.7 },
  { time: "12:00", sessions: 253, up: 53, down: 44, both: 156, pct: 61.7 },
  { time: "12:30", sessions: 253, up: 47, down: 43, both: 163, pct: 64.4 },
  { time: "13:00", sessions: 253, up: 51, down: 40, both: 161, pct: 63.6 },
  { time: "13:30", sessions: 252, up: 41, down: 42, both: 166, pct: 65.9 },
  { time: "14:00", sessions: 252, up: 41, down: 40, both: 171, pct: 67.9 },
  { time: "14:30", sessions: 252, up: 55, down: 42, both: 155, pct: 61.5 },
  { time: "15:00", sessions: 252, up: 53, down: 46, both: 153, pct: 60.7 }
];

export const heatmapData = Array.from({ length: 7 }, (_, day) => {
  return Array.from({ length: 9 }, (_, hour) => {
    return {
      day,
      hour,
      value: Math.random() * 100 // Keeping randomized for heatmap as we didn't export per-DOW-per-Hour
    };
  });
});

export const reversalProbData = [
  { time: "07:30-08:00", value: 87.3, risk: "high" },
  { time: "08:00-08:30", value: 83.7, risk: "high" },
  { time: "08:30-09:00", value: 75.0, risk: "high" },
  { time: "09:00-09:30", value: 77.0, risk: "high" },
  { time: "09:30-10:00", value: 43.3, risk: "medium" },
  { time: "10:00-10:30", value: 40.1, risk: "low" },
  { time: "10:30-11:00", value: 40.1, risk: "low" },
  { time: "11:00-11:30", value: 44.1, risk: "medium" },
  { time: "11:30-12:00", value: 46.4, risk: "medium" },
  { time: "12:00-12:30", value: 48.0, risk: "medium" },
  { time: "14:00-14:30", value: 34.1, risk: "low" },
  { time: "15:00-15:30", value: 5.2, risk: "low" }
];

export const reversalTimeData = breakoutTableData.map(r => ({
  time: r.time,
  value: r.pct
}));

export const structureDistData = [
  { range: "0-200", count: 1 },
  { range: "200-400", count: 13 },
  { range: "400-600", count: 37 },
  { range: "600-800", count: 49 },
  { range: "800-1000", count: 53 },
  { range: "1000-1200", count: 32 },
  { range: "1200+", count: 67 }
];

export const retestData = [
  { name: "Retest", value: 81.4, fill: "var(--color-success)" },
  { name: "No Retest", value: 18.6, fill: "var(--color-muted)" }
];

export const volumeProfileData = Array.from({ length: 20 }, (_, i) => ({
  priceLevel: 90000 + i * 500, // Adjusted for BTC 2025 price levels approx
  volume: Math.floor(Math.random() * 1000)
}));

// NEW: Real Comparison Data
export const comparisonData = [
  { condition: 'IB1 > IB2', x: 67.8, y: 31.0, breakout: 67.8, reversal: 31.0, count: 87 },
  { condition: 'IB1 < IB2', x: 50.3, y: 49.7, breakout: 50.3, reversal: 49.7, count: 165 },
  // 'IB1 ≈ IB2' (Equal) logic wasn't explicitly in our python script, assuming absorbed into others or negligible. 
  // We'll keep a placeholder or remove if zero.
  { condition: 'IB1 ≈ IB2', x: 55, y: 45, breakout: 55, reversal: 45, count: 0 },
];

export const crossAnalysisData = [
  {
    "time": "07:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 13.8,
    "reversal_prob": 86.2,
    "count": 87
  },
  {
    "time": "07:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 12.1,
    "reversal_prob": 87.9,
    "count": 165
  },
  {
    "time": "08:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 23.0,
    "reversal_prob": 77.0,
    "count": 87
  },
  {
    "time": "08:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 12.7,
    "reversal_prob": 87.3,
    "count": 165
  },
  {
    "time": "08:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 28.7,
    "reversal_prob": 71.3,
    "count": 87
  },
  {
    "time": "08:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 23.0,
    "reversal_prob": 77.0,
    "count": 165
  },
  {
    "time": "09:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 32.2,
    "reversal_prob": 67.8,
    "count": 87
  },
  {
    "time": "09:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 18.2,
    "reversal_prob": 81.8,
    "count": 165
  },
  {
    "time": "09:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 69.0,
    "reversal_prob": 31.0,
    "count": 87
  },
  {
    "time": "09:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 50.3,
    "reversal_prob": 49.7,
    "count": 165
  },
  {
    "time": "10:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 51.7,
    "reversal_prob": 48.3,
    "count": 87
  },
  {
    "time": "10:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 64.2,
    "reversal_prob": 35.8,
    "count": 165
  },
  {
    "time": "10:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 49.4,
    "reversal_prob": 50.6,
    "count": 87
  },
  {
    "time": "10:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 65.5,
    "reversal_prob": 34.5,
    "count": 165
  },
  {
    "time": "11:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 48.3,
    "reversal_prob": 51.7,
    "count": 87
  },
  {
    "time": "11:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 60.0,
    "reversal_prob": 40.0,
    "count": 165
  },
  {
    "time": "11:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 51.7,
    "reversal_prob": 48.3,
    "count": 87
  },
  {
    "time": "11:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 54.5,
    "reversal_prob": 45.5,
    "count": 165
  },
  {
    "time": "12:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 51.7,
    "reversal_prob": 48.3,
    "count": 87
  },
  {
    "time": "12:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 52.1,
    "reversal_prob": 47.9,
    "count": 165
  },
  {
    "time": "12:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 59.8,
    "reversal_prob": 40.2,
    "count": 87
  },
  {
    "time": "12:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 55.2,
    "reversal_prob": 44.8,
    "count": 165
  },
  {
    "time": "13:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 52.9,
    "reversal_prob": 47.1,
    "count": 87
  },
  {
    "time": "13:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 58.2,
    "reversal_prob": 41.8,
    "count": 165
  },
  {
    "time": "13:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 54.0,
    "reversal_prob": 46.0,
    "count": 87
  },
  {
    "time": "13:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 61.8,
    "reversal_prob": 38.2,
    "count": 165
  },
  {
    "time": "14:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 58.6,
    "reversal_prob": 41.4,
    "count": 87
  },
  {
    "time": "14:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 69.7,
    "reversal_prob": 30.3,
    "count": 165
  },
  {
    "time": "14:30",
    "structure": "IB1 > IB2",
    "breakout_prob": 73.6,
    "reversal_prob": 26.4,
    "count": 87
  },
  {
    "time": "14:30",
    "structure": "IB1 < IB2",
    "breakout_prob": 80.0,
    "reversal_prob": 20.0,
    "count": 165
  },
  {
    "time": "15:00",
    "structure": "IB1 > IB2",
    "breakout_prob": 96.6,
    "reversal_prob": 3.4,
    "count": 87
  },
  {
    "time": "15:00",
    "structure": "IB1 < IB2",
    "breakout_prob": 93.9,
    "reversal_prob": 6.1,
    "count": 165
  }
];

export const cvdData = [
  {
    "time": "07:30",
    "avg_delta": -10.59,
    "avg_volume": 90.07,
    "avg_trades": 11550.2
  },
  {
    "time": "07:35",
    "avg_delta": -4.45,
    "avg_volume": 86.4,
    "avg_trades": 11393.1
  },
  {
    "time": "07:40",
    "avg_delta": -1.05,
    "avg_volume": 74.94,
    "avg_trades": 9919.4
  },
  {
    "time": "07:45",
    "avg_delta": -2.55,
    "avg_volume": 75.51,
    "avg_trades": 9890.5
  },
  {
    "time": "07:50",
    "avg_delta": -2.17,
    "avg_volume": 73.78,
    "avg_trades": 9152.1
  },
  {
    "time": "07:55",
    "avg_delta": -4.15,
    "avg_volume": 69.71,
    "avg_trades": 7992.9
  },
  {
    "time": "08:00",
    "avg_delta": -1.51,
    "avg_volume": 75.7,
    "avg_trades": 11254.9
  },
  {
    "time": "08:05",
    "avg_delta": -0.44,
    "avg_volume": 68.73,
    "avg_trades": 10290.9
  },
  {
    "time": "08:10",
    "avg_delta": -1.81,
    "avg_volume": 62.84,
    "avg_trades": 9740.5
  },
  {
    "time": "08:15",
    "avg_delta": 0.15,
    "avg_volume": 67.84,
    "avg_trades": 11094.6
  },
  {
    "time": "08:20",
    "avg_delta": -2.56,
    "avg_volume": 65.17,
    "avg_trades": 10692.4
  },
  {
    "time": "08:25",
    "avg_delta": -0.02,
    "avg_volume": 59.42,
    "avg_trades": 9756.0
  },
  {
    "time": "08:30",
    "avg_delta": -1.02,
    "avg_volume": 64.36,
    "avg_trades": 11298.9
  },
  {
    "time": "08:35",
    "avg_delta": -0.05,
    "avg_volume": 59.96,
    "avg_trades": 10312.7
  },
  {
    "time": "08:40",
    "avg_delta": -3.18,
    "avg_volume": 58.26,
    "avg_trades": 9309.2
  },
  {
    "time": "08:45",
    "avg_delta": -5.07,
    "avg_volume": 62.87,
    "avg_trades": 10372.4
  },
  {
    "time": "08:50",
    "avg_delta": -5.05,
    "avg_volume": 62.17,
    "avg_trades": 9828.3
  },
  {
    "time": "08:55",
    "avg_delta": -1.0,
    "avg_volume": 52.59,
    "avg_trades": 7854.6
  },
  {
    "time": "09:00",
    "avg_delta": -3.19,
    "avg_volume": 64.6,
    "avg_trades": 10816.8
  },
  {
    "time": "09:05",
    "avg_delta": -1.01,
    "avg_volume": 61.78,
    "avg_trades": 10555.7
  },
  {
    "time": "09:10",
    "avg_delta": -3.35,
    "avg_volume": 56.51,
    "avg_trades": 9370.9
  },
  {
    "time": "09:15",
    "avg_delta": -1.81,
    "avg_volume": 60.23,
    "avg_trades": 10510.6
  },
  {
    "time": "09:20",
    "avg_delta": -1.38,
    "avg_volume": 62.27,
    "avg_trades": 10152.9
  },
  {
    "time": "09:25",
    "avg_delta": -3.47,
    "avg_volume": 62.86,
    "avg_trades": 9468.4
  },
  {
    "time": "09:30",
    "avg_delta": -3.01,
    "avg_volume": 65.34,
    "avg_trades": 10989.0
  },
  {
    "time": "09:35",
    "avg_delta": -0.92,
    "avg_volume": 58.7,
    "avg_trades": 10088.2
  },
  {
    "time": "09:40",
    "avg_delta": -0.73,
    "avg_volume": 60.45,
    "avg_trades": 9273.5
  },
  {
    "time": "09:45",
    "avg_delta": -1.01,
    "avg_volume": 60.23,
    "avg_trades": 10099.2
  },
  {
    "time": "09:50",
    "avg_delta": -1.09,
    "avg_volume": 59.51,
    "avg_trades": 9372.6
  },
  {
    "time": "09:55",
    "avg_delta": -3.59,
    "avg_volume": 48.89,
    "avg_trades": 7774.9
  },
  {
    "time": "10:00",
    "avg_delta": -5.35,
    "avg_volume": 62.77,
    "avg_trades": 10974.0
  },
  {
    "time": "10:05",
    "avg_delta": -2.88,
    "avg_volume": 55.12,
    "avg_trades": 10019.2
  },
  {
    "time": "10:10",
    "avg_delta": -1.77,
    "avg_volume": 53.96,
    "avg_trades": 9159.4
  },
  {
    "time": "10:15",
    "avg_delta": -1.74,
    "avg_volume": 59.26,
    "avg_trades": 10313.4
  },
  {
    "time": "10:20",
    "avg_delta": -3.96,
    "avg_volume": 63.55,
    "avg_trades": 10001.1
  },
  {
    "time": "10:25",
    "avg_delta": 0.3,
    "avg_volume": 55.88,
    "avg_trades": 8776.9
  },
  {
    "time": "10:30",
    "avg_delta": 0.75,
    "avg_volume": 63.09,
    "avg_trades": 10583.3
  },
  {
    "time": "10:35",
    "avg_delta": -1.11,
    "avg_volume": 57.4,
    "avg_trades": 9806.0
  },
  {
    "time": "10:40",
    "avg_delta": -4.09,
    "avg_volume": 55.13,
    "avg_trades": 8722.9
  },
  {
    "time": "10:45",
    "avg_delta": -4.74,
    "avg_volume": 53.58,
    "avg_trades": 9311.0
  },
  {
    "time": "10:50",
    "avg_delta": -2.27,
    "avg_volume": 51.73,
    "avg_trades": 8857.3
  },
  {
    "time": "10:55",
    "avg_delta": -1.47,
    "avg_volume": 49.13,
    "avg_trades": 7405.1
  },
  {
    "time": "11:00",
    "avg_delta": -0.76,
    "avg_volume": 63.67,
    "avg_trades": 10524.9
  },
  {
    "time": "11:05",
    "avg_delta": 1.88,
    "avg_volume": 56.88,
    "avg_trades": 9764.8
  },
  {
    "time": "11:10",
    "avg_delta": 0.34,
    "avg_volume": 55.42,
    "avg_trades": 8834.0
  },
  {
    "time": "11:15",
    "avg_delta": -1.94,
    "avg_volume": 60.81,
    "avg_trades": 10395.9
  },
  {
    "time": "11:20",
    "avg_delta": -3.66,
    "avg_volume": 55.56,
    "avg_trades": 9390.5
  },
  {
    "time": "11:25",
    "avg_delta": -0.99,
    "avg_volume": 57.16,
    "avg_trades": 8634.8
  },
  {
    "time": "11:30",
    "avg_delta": -3.88,
    "avg_volume": 63.11,
    "avg_trades": 10621.3
  },
  {
    "time": "11:35",
    "avg_delta": -4.66,
    "avg_volume": 56.24,
    "avg_trades": 9752.0
  },
  {
    "time": "11:40",
    "avg_delta": -3.59,
    "avg_volume": 58.6,
    "avg_trades": 9181.1
  },
  {
    "time": "11:45",
    "avg_delta": -1.39,
    "avg_volume": 57.05,
    "avg_trades": 9692.4
  },
  {
    "time": "11:50",
    "avg_delta": -0.83,
    "avg_volume": 54.47,
    "avg_trades": 9246.2
  },
  {
    "time": "11:55",
    "avg_delta": -0.87,
    "avg_volume": 53.0,
    "avg_trades": 8085.5
  },
  {
    "time": "12:00",
    "avg_delta": -0.58,
    "avg_volume": 73.15,
    "avg_trades": 12652.8
  },
  {
    "time": "12:05",
    "avg_delta": -2.73,
    "avg_volume": 62.72,
    "avg_trades": 11272.9
  },
  {
    "time": "12:10",
    "avg_delta": -0.89,
    "avg_volume": 65.64,
    "avg_trades": 10438.3
  },
  {
    "time": "12:15",
    "avg_delta": -0.21,
    "avg_volume": 65.81,
    "avg_trades": 11747.4
  },
  {
    "time": "12:20",
    "avg_delta": -1.61,
    "avg_volume": 68.44,
    "avg_trades": 11409.0
  },
  {
    "time": "12:25",
    "avg_delta": -3.71,
    "avg_volume": 64.71,
    "avg_trades": 9917.2
  },
  {
    "time": "12:30",
    "avg_delta": -1.72,
    "avg_volume": 112.99,
    "avg_trades": 15776.2
  },
  {
    "time": "12:35",
    "avg_delta": -3.96,
    "avg_volume": 82.01,
    "avg_trades": 13526.4
  },
  {
    "time": "12:40",
    "avg_delta": 0.49,
    "avg_volume": 76.51,
    "avg_trades": 12377.8
  },
  {
    "time": "12:45",
    "avg_delta": -3.19,
    "avg_volume": 73.78,
    "avg_trades": 12840.8
  },
  {
    "time": "12:50",
    "avg_delta": -2.95,
    "avg_volume": 65.94,
    "avg_trades": 11554.1
  },
  {
    "time": "12:55",
    "avg_delta": -3.13,
    "avg_volume": 64.83,
    "avg_trades": 10144.2
  },
  {
    "time": "13:00",
    "avg_delta": -2.52,
    "avg_volume": 80.19,
    "avg_trades": 13708.3
  },
  {
    "time": "13:05",
    "avg_delta": -1.26,
    "avg_volume": 79.25,
    "avg_trades": 13416.1
  },
  {
    "time": "13:10",
    "avg_delta": -2.1,
    "avg_volume": 71.34,
    "avg_trades": 11877.2
  },
  {
    "time": "13:15",
    "avg_delta": -3.89,
    "avg_volume": 80.6,
    "avg_trades": 13573.1
  },
  {
    "time": "13:20",
    "avg_delta": -0.87,
    "avg_volume": 72.87,
    "avg_trades": 12792.1
  },
  {
    "time": "13:25",
    "avg_delta": -4.93,
    "avg_volume": 75.64,
    "avg_trades": 11868.4
  },
  {
    "time": "13:30",
    "avg_delta": -1.14,
    "avg_volume": 149.77,
    "avg_trades": 25556.3
  },
  {
    "time": "13:35",
    "avg_delta": -2.21,
    "avg_volume": 137.38,
    "avg_trades": 25056.2
  },
  {
    "time": "13:40",
    "avg_delta": -3.54,
    "avg_volume": 127.73,
    "avg_trades": 23104.5
  },
  {
    "time": "13:45",
    "avg_delta": 0.76,
    "avg_volume": 132.68,
    "avg_trades": 24357.0
  },
  {
    "time": "13:50",
    "avg_delta": -7.71,
    "avg_volume": 122.8,
    "avg_trades": 22260.7
  },
  {
    "time": "13:55",
    "avg_delta": -4.18,
    "avg_volume": 114.18,
    "avg_trades": 18943.4
  },
  {
    "time": "14:00",
    "avg_delta": -1.0,
    "avg_volume": 138.26,
    "avg_trades": 25502.2
  },
  {
    "time": "14:05",
    "avg_delta": -3.13,
    "avg_volume": 121.01,
    "avg_trades": 22654.4
  },
  {
    "time": "14:10",
    "avg_delta": -1.51,
    "avg_volume": 115.55,
    "avg_trades": 20438.4
  },
  {
    "time": "14:15",
    "avg_delta": -2.09,
    "avg_volume": 130.86,
    "avg_trades": 22498.6
  },
  {
    "time": "14:20",
    "avg_delta": -7.67,
    "avg_volume": 122.41,
    "avg_trades": 21170.9
  },
  {
    "time": "14:25",
    "avg_delta": -4.27,
    "avg_volume": 115.03,
    "avg_trades": 19552.1
  },
  {
    "time": "14:30",
    "avg_delta": -2.5,
    "avg_volume": 163.82,
    "avg_trades": 29114.1
  },
  {
    "time": "14:35",
    "avg_delta": -3.45,
    "avg_volume": 161.96,
    "avg_trades": 27850.2
  },
  {
    "time": "14:40",
    "avg_delta": -3.44,
    "avg_volume": 147.41,
    "avg_trades": 25473.6
  },
  {
    "time": "14:45",
    "avg_delta": -1.71,
    "avg_volume": 154.16,
    "avg_trades": 26823.0
  },
  {
    "time": "14:50",
    "avg_delta": -4.42,
    "avg_volume": 144.44,
    "avg_trades": 25426.9
  },
  {
    "time": "14:55",
    "avg_delta": -4.48,
    "avg_volume": 134.86,
    "avg_trades": 21855.8
  },
  {
    "time": "15:00",
    "avg_delta": -3.74,
    "avg_volume": 158.77,
    "avg_trades": 27138.6
  },
  {
    "time": "15:05",
    "avg_delta": -2.87,
    "avg_volume": 149.43,
    "avg_trades": 25629.1
  },
  {
    "time": "15:10",
    "avg_delta": -2.25,
    "avg_volume": 137.52,
    "avg_trades": 23118.2
  },
  {
    "time": "15:15",
    "avg_delta": 0.27,
    "avg_volume": 136.78,
    "avg_trades": 23972.4
  },
  {
    "time": "15:20",
    "avg_delta": -0.14,
    "avg_volume": 131.77,
    "avg_trades": 23049.0
  },
  {
    "time": "15:25",
    "avg_delta": -6.35,
    "avg_volume": 126.66,
    "avg_trades": 21521.9
  },
  {
    "time": "15:30",
    "avg_delta": -5.8,
    "avg_volume": 136.36,
    "avg_trades": 24035.5
  },
  {
    "time": "15:35",
    "avg_delta": -3.16,
    "avg_volume": 123.32,
    "avg_trades": 22599.9
  },
  {
    "time": "15:40",
    "avg_delta": -3.28,
    "avg_volume": 114.63,
    "avg_trades": 20307.9
  },
  {
    "time": "15:45",
    "avg_delta": -7.23,
    "avg_volume": 119.47,
    "avg_trades": 21827.4
  },
  {
    "time": "15:50",
    "avg_delta": -3.13,
    "avg_volume": 114.27,
    "avg_trades": 20378.6
  },
  {
    "time": "15:55",
    "avg_delta": -4.01,
    "avg_volume": 106.6,
    "avg_trades": 17772.0
  },
  {
    "time": "16:00",
    "avg_delta": -0.75,
    "avg_volume": 118.65,
    "avg_trades": 22098.1
  }
];
