
export const breakoutStats = {
  totalSessions: 250,
  avgBreakouts: "78%",
  peakTime: "10:30-11:00",
  highest: "86.4%",
  lowest: "42.4%",
  optimal: "10:00"
};

export const breakoutTimeData = Array.from({ length: 18 }, (_, i) => {
  const hour = Math.floor((i * 30) / 60) + 7;
  const minute = (i * 30) % 60;
  const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  
  // Create a curve that peaks around 10:30
  let prob = 40 + Math.random() * 20;
  if (i >= 5 && i <= 8) prob += 30; // Peak around 9:30 - 11:00
  if (i > 12) prob -= 15; // Drop off later
  
  return {
    time,
    probability: Math.min(98, Math.max(10, Math.round(prob)))
  };
});

export const breakoutTableData = [
  { time: "07:30", sessions: 45, up: 12, down: 18, both: 5, pct: 65 },
  { time: "08:00", sessions: 48, up: 15, down: 20, both: 8, pct: 72 },
  { time: "08:30", sessions: 52, up: 18, down: 22, both: 6, pct: 76 },
  { time: "09:00", sessions: 55, up: 20, down: 25, both: 4, pct: 81 },
  { time: "09:30", sessions: 60, up: 25, down: 28, both: 3, pct: 88 },
  { time: "10:00", sessions: 58, up: 22, down: 26, both: 5, pct: 84 },
  { time: "10:30", sessions: 56, up: 24, down: 24, both: 4, pct: 85 },
  { time: "11:00", sessions: 50, up: 18, down: 20, both: 6, pct: 76 },
  { time: "11:30", sessions: 45, up: 15, down: 18, both: 7, pct: 73 },
  { time: "12:00", sessions: 42, up: 12, down: 15, both: 8, pct: 64 },
  { time: "12:30", sessions: 40, up: 10, down: 12, both: 10, pct: 55 },
  { time: "13:00", sessions: 38, up: 8, down: 10, both: 12, pct: 47 },
  { time: "13:30", sessions: 35, up: 7, down: 9, both: 11, pct: 45 },
  { time: "14:00", sessions: 32, up: 6, down: 8, both: 10, pct: 43 },
  { time: "14:30", sessions: 30, up: 5, down: 7, both: 9, pct: 40 },
  { time: "15:00", sessions: 28, up: 8, down: 12, both: 4, pct: 71 },
  { time: "15:30", sessions: 25, up: 10, down: 10, both: 2, pct: 80 },
];

export const heatmapData = Array.from({ length: 7 }, (_, day) => {
  return Array.from({ length: 9 }, (_, hour) => {
    return {
      day,
      hour,
      value: Math.random() * 100
    };
  });
});

export const reversalProbData = [
  { time: "07:30-08:00", value: 86.4, risk: "high" },
  { time: "08:00-08:30", value: 82.0, risk: "high" },
  { time: "08:30-09:00", value: 75.5, risk: "high" },
  { time: "09:00-09:30", value: 68.2, risk: "medium" },
  { time: "09:30-10:00", value: 55.4, risk: "medium" },
  { time: "10:00-10:30", value: 42.4, risk: "low" },
  { time: "10:30-11:00", value: 38.6, risk: "low" },
  { time: "11:00-11:30", value: 45.2, risk: "low" },
];

export const reversalTimeData = Array.from({ length: 20 }, (_, i) => {
  const hour = Math.floor((i * 30) / 60) + 7;
  const minute = (i * 30) % 60;
  return {
    time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    value: Math.round(30 + Math.random() * 40 + (i < 6 ? 20 : 0))
  };
});

export const structureDistData = [
  { range: "0-200", count: 15 },
  { range: "200-400", count: 45 },
  { range: "400-600", count: 85 },
  { range: "600-800", count: 120 }, // Avg around here
  { range: "800-1000", count: 90 },
  { range: "1000-1200", count: 60 },
  { range: "1200+", count: 35 },
];

export const retestData = [
  { name: "Retest", value: 68, fill: "var(--color-success)" },
  { name: "No Retest", value: 32, fill: "var(--color-muted)" },
];

export const volumeProfileData = Array.from({ length: 20 }, (_, i) => ({
  priceLevel: 100 + i * 5,
  volume: Math.floor(Math.random() * 1000)
}));
