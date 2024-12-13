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
    data: [82, 80, 78, 75, 73, 70, 72, 69, 71, 68, 65, 67],
    events: [
      { date: 'Month 2', value: 73, type: 'feedback', details: 'Multiple complaints about response time in community forum' },
      { date: 'Month 2.5', value: 70, type: 'incident', details: 'Technical issues during major community event' },
      { date: 'Month 3', value: 67, type: 'survey', details: 'Low satisfaction scores in monthly feedback survey' }
    ]
  },
  '6m': { 
    label: '6 months', 
    data: [85, 83, 80, 78, 75, 73, 70, 68, 65, 63, 60, 62, 59, 57, 55, 53],
    events: [
      { date: 'Month 3', value: 70, type: 'feature', details: 'Popular feature removed without community consultation' },
      { date: 'Month 4', value: 63, type: 'moderation', details: 'Unresolved conflicts in community discussions' },
      { date: 'Month 6', value: 53, type: 'pricing', details: 'Price increase announcement with negative feedback' }
    ]
  },
  '12m': { 
    label: '12 months', 
    data: [90, 87, 85, 82, 80, 78, 75, 73, 70, 68, 65, 63, 60, 58, 55, 53, 50, 48, 45, 43, 40, 38, 35, 33],
    events: [
      { date: 'Month 4', value: 75, type: 'engagement', details: 'Declining participation in community events' },
      { date: 'Month 8', value: 55, type: 'support', details: 'Support response times exceeding 48 hours' },
      { date: 'Month 12', value: 33, type: 'competitor', details: 'Competitor launched enhanced community features' }
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

export const SkeletonFour = () => {
  const [timeframe, setTimeframe] = useState('3m');
  const metrics = [
    {
      title: "Active Users",
      value: "24,582",
      change: -12,
      icon: <UsersIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    },
    {
      title: "Eng. Rate",
      value: "56.8%",
      change: -2.4,
      icon: <ChartBarIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    },
    {
      title: "Growth Rate",
      value: "32.1%",
      change: -8.2,
      icon: <ArrowTrendingUpIcon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
    }
  ];

  const chartData = {
    labels: timeframes[timeframe].data.map((_, i) => `Month ${(i + 1).toFixed(1)}`),
    datasets: [
      {
        label: 'Member Retention',
        data: timeframes[timeframe].data,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
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
        callbacks: {
          label: (context) => {
            const event = timeframes[timeframe].events?.find(e => 
              e.date === context.label || Math.abs(e.value - context.raw) < 0.1
            );
            return event 
              ? [`Retention: ${context.formattedValue}%`, `Issue: ${event.details}`]
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
    <div className="relative h-full w-full">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background dark:from-background via-background dark:via-background to-transparent pointer-events-none z-10" />
      <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
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

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <h3 className="text-lg font-medium mb-4">Churn Timeline</h3>
          <div className="h-[300px]">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};
