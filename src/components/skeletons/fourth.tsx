"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  ChartBarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeframes = {
  '3m': { 
    label: '3 months',
    monthCount: 3,
    data: [67, 78, 90],
    events: [
      { date: 'January', value: 67, type: 'start', details: 'Initial retention baseline' },
      { date: 'February', value: 78, type: 'feature', details: 'Launched AI-powered onboarding - 16% increase' },
      { date: 'March', value: 90, type: 'milestone', details: 'Community mentorship program drives 15% boost' }
    ]
  },
  '6m': { 
    label: '6 months',
    monthCount: 6,
    data: [55, 58, 72, 68, 85, 98],
    events: [
      { date: 'January', value: 55, type: 'start', details: 'New year retention baseline' },
      { date: 'February', value: 58, type: 'update', details: 'Platform UI refresh - slight improvement' },
      { date: 'March', value: 72, type: 'feature', details: 'Launched peer matching system - 24% jump' },
      { date: 'April', value: 68, type: 'dip', details: 'Brief dip during system maintenance' },
      { date: 'May', value: 85, type: 'growth', details: 'Community challenges boost engagement 25%' },
      { date: 'June', value: 98, type: 'milestone', details: 'Record retention after rewards program launch' }
    ]
  },
  '12m': { 
    label: '12 months',
    monthCount: 12,
    data: [45, 48, 52, 65, 63, 75, 78, 92, 88, 95, 93, 95],
    events: [
      { date: 'January', value: 45, type: 'start', details: 'Annual retention reset point' },
      { date: 'March', value: 52, type: 'feature', details: 'Mobile app launch - steady growth begins' },
      { date: 'April', value: 65, type: 'milestone', details: 'First community conference - 25% surge' },
      { date: 'May', value: 63, type: 'dip', details: 'Brief decline during platform migration' },
      { date: 'June', value: 75, type: 'recovery', details: 'New features restore growth trajectory' },
      { date: 'August', value: 92, type: 'feature', details: 'AI-powered content recommendations - major jump' },
      { date: 'September', value: 88, type: 'adjustment', details: 'Natural stabilization after rapid growth' },
      { date: 'October', value: 95, type: 'milestone', details: 'Community-led initiatives drive engagement' },
      { date: 'December', value: 95, type: 'success', details: 'Year-end goal achieved: 95% retention' }
    ]
  }
};

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
}

const MetricCard = ({ title, value, change, icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-sm text-neutral-500">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        <div className="flex items-center mt-2">
          {change > 0 ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        {icon}
      </div>
    </div>
  </motion.div>
);

const getMonthName = (index: number) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[index % 12];
};

export const SkeletonFour = () => {
  const [timeframe, setTimeframe] = useState('6m');

  const metricsByTimeframe = {
    '3m': {
      activeUsers: { change: 5.2 },
      engRate: { change: 3.1 },
      churnRate: { change: -0.8 }
    },
    '6m': {
      activeUsers: { change: 12.4 },
      engRate: { change: 8.7 },
      churnRate: { change: -2.1 }
    },
    '12m': {
      activeUsers: { change: 24.6 },
      engRate: { change: 15.3 },
      churnRate: { change: -4.2 }
    }
  };

  const currentMetrics = metricsByTimeframe[timeframe];
  
  const metrics = [
    {
      title: "Active Users",
      value: "24,582",
      change: currentMetrics.activeUsers.change,
      icon: <UsersIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    },
    {
      title: "Eng. Rate",
      value: "56.8%",
      change: currentMetrics.engRate.change,
      icon: <ChartBarIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: currentMetrics.churnRate.change,
      icon: <ArrowTrendingUpIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    }
  ];

  const chartData = {
    labels: Array.from({ length: timeframes[timeframe].monthCount }, (_, i) => getMonthName(i)),
    datasets: [
      {
        label: 'Member Retention',
        data: timeframes[timeframe].data,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: (context) => {
          const value = context.raw;
          const event = timeframes[timeframe].events?.find(e => Math.abs(e.value - value) < 0.1);
          return event ? 8 : 2;
        },
        pointBackgroundColor: (context) => {
          const value = context.raw;
          const event = timeframes[timeframe].events?.find(e => Math.abs(e.value - value) < 0.1);
          return event ? '#22c55e' : 'rgba(34, 197, 94, 0.5)';
        },
        pointBorderColor: (context) => {
          const value = context.raw;
          const event = timeframes[timeframe].events?.find(e => Math.abs(e.value - value) < 0.1);
          return event ? 'white' : '#22c55e';
        },
        pointBorderWidth: (context) => {
          const value = context.raw;
          const event = timeframes[timeframe].events?.find(e => Math.abs(e.value - value) < 0.1);
          return event ? 2 : 1;
        },
        pointHoverRadius: (context) => {
          const value = context.raw;
          const event = timeframes[timeframe].events?.find(e => Math.abs(e.value - value) < 0.1);
          return event ? 10 : 4;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const event = timeframes[timeframe].events?.find(e => 
              e.date === getMonthName(context.dataIndex) || Math.abs(e.value - context.raw) < 0.1
            );
            return event 
              ? [`Retention: ${context.formattedValue}%`, `Achievement: ${event.details}`]
              : `Retention: ${context.formattedValue}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 30,
        max: 100,
        title: {
          display: true,
          text: 'Member Retention %'
        }
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-full">
        <div className="relative space-y-6 overflow-y-auto max-h-[500px]">
          <div className="px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Analytics Overview</h2>
              <select 
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1 text-sm"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="3m">3 months</option>
                <option value="6m">6 months</option>
                <option value="12m">12 months</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard key={metric.title} {...metric} delay={index * 0.1} />
              ))}
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 pb-0 w-full">
              <h3 className="text-lg font-medium mb-6">Retention Timeline</h3>
              <div className="w-full h-[320px]">
                <Line 
                  data={chartData} 
                  options={{
                    ...options,
                    maintainAspectRatio: false,
                    responsive: true,
                    layout: {
                      padding: {
                        left: 10,
                        right: 20,
                        top: 10,
                        bottom: 0
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
          <div 
            className="pointer-events-none sticky inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3EDE5] dark:from-[#1D3640] -mt-32" 
          />
        </div>
      </div>
    </div>
  );
};
