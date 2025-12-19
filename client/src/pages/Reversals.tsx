import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, Label
} from "recharts";
import { reversalProbData, reversalTimeData } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-2 rounded-lg shadow-lg text-xs">
        <p className="font-mono text-muted-foreground mb-1">{label}</p>
        <p className="font-medium text-foreground">
          Val: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Reversals() {
  const pieData = [
    { name: 'High Risk', value: 74, fill: 'var(--color-bearish)' },
    { name: 'Low Risk', value: 26, fill: 'var(--color-success)' },
  ];

  return (
    <DashboardLayout 
      subtitle="Reversals Analysis - NY Session"
      dateRange="Jan 1 - Dec 31, 2025"
    >
      <BentoGrid>
        
        {/* Reversal Rate Donut */}
        <BentoCard colSpan={4} rowSpan={2} title="Overall Reversal Rate">
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Label 
                    value="74%" 
                    position="center" 
                    fill="var(--color-foreground)" 
                    style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 w-full flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-bearish" />
                <span className="text-muted-foreground">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Low Risk</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Reversal Probability Bar Chart */}
        <BentoCard colSpan={8} rowSpan={2} title="Reversal Probability by Time">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={reversalProbData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" opacity={0.5} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="time" 
                  type="category" 
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-mono)" }} 
                  width={80}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'var(--color-muted)/20'}}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {reversalProbData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.value > 70 ? 'var(--color-bearish)' : 
                        entry.value > 50 ? 'var(--color-warning)' : 
                        'var(--color-success)'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Time-Based Patterns */}
        <BentoCard colSpan={8} rowSpan={2} title="Time-Based Reversal Patterns">
           <div className="h-[250px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart
                 data={reversalTimeData}
                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
               >
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} minTickGap={30} />
                 <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                 <Tooltip content={<CustomTooltip />} />
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.3} />
                 <Area type="monotone" dataKey="value" stroke="var(--color-warning)" fillOpacity={1} fill="url(#colorRev)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </BentoCard>

        {/* Risk Zones List */}
        <BentoCard colSpan={4} rowSpan={2} title="Risk Zones">
          <div className="space-y-4 mt-2">
            <div className="p-3 rounded-lg border border-bearish/30 bg-bearish/10">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold">07:30 - 09:00</span>
                <AlertTriangle size={14} className="text-bearish" />
              </div>
              <p className="text-xs text-muted-foreground">Very High Reversal Probability. Avoid trend continuation trades.</p>
            </div>
            
            <div className="p-3 rounded-lg border border-warning/30 bg-warning/10">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold">09:30 - 10:00</span>
                <AlertTriangle size={14} className="text-warning" />
              </div>
              <p className="text-xs text-muted-foreground">Moderate Risk. Market seeking direction.</p>
            </div>

            <div className="p-3 rounded-lg border border-success/30 bg-success/10">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-sm font-bold">10:00 - 11:00</span>
                <CheckCircle2 size={14} className="text-success" />
              </div>
              <p className="text-xs text-muted-foreground">Optimal Window. Trends tend to establish here.</p>
            </div>
          </div>
        </BentoCard>

      </BentoGrid>
    </DashboardLayout>
  );
}
