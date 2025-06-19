
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  date: string;
  value: number;
  severity: 'none' | 'mild' | 'severe';
}

interface ProgressChartProps {
  data: DataPoint[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DataPoint;
    
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'none': return 'bg-therapy-green-100 text-green-800';
        case 'mild': return 'bg-therapy-yellow-100 text-amber-700';
        case 'severe': return 'bg-therapy-pink-100 text-rose-700';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-600">Score: {data.value}</p>
        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${getSeverityColor(data.severity)}`}>
          {data.severity.charAt(0).toUpperCase() + data.severity.slice(1)}
        </span>
      </div>
    );
  }

  return null;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ data, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ stroke: '#7E69AB', strokeWidth: 2, r: 4, fill: '#fff' }}
                activeDot={{ r: 6, stroke: '#6E59A5', strokeWidth: 1 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
