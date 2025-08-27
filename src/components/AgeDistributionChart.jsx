// AgeDistributionChart.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ageData = [
  { name: '2-3 years', value: 28, color: '#EF3349' },
  { name: '3-4 years', value: 35, color: '#2BCB9A' },
  { name: '4-5 years', value: 26, color: '#FFCF25' },
];

const AgeDistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-800">Age Distribution</CardTitle>
        <CardDescription>Current enrollment by age groups</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ageData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AgeDistributionChart;
