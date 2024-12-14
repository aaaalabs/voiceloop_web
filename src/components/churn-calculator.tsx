"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculationResult {
  month: number;
  members: number;
  monthlyRevenue: number;
  baselineMembers: number;
  baselineMonthlyRevenue: number;
  churnRate: number;
}

const tooltipInfo = {
  "Initial Members": "Current number of members in your community",
  "Monthly Fee": "Monthly subscription fee per member",
  "Growth Rate": "Percentage of new members joining monthly (e.g., if you get 40 new members with 100 existing members, enter 40%)",
  "Initial Churn": "Percentage of members leaving monthly (Calculate: Members lost last month ÷ Total members at start of month × 100)",
  "Monthly Churn Reduction": "How much you can reduce churn each month through improved engagement (Industry standard: 1-2%)",
  "Target Churn": "Your goal for the lowest churn rate (Best-in-class communities achieve 5-7%)",
  "Months": "Time period for the projection",
};

const InputField = ({ label, value, onChange, suffix = "", type = "number", options = null as string[] | null }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  const handleMouseEnter = () => {
    if (!isHovering.current) {
      isHovering.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isHovering.current) {
        setShowTooltip(false);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="mb-4 relative"
    >
      <div 
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label}
        <AnimatePresence>
          {showTooltip && tooltipInfo[label] && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 px-4 py-2 text-sm bg-[#F3EDE5] dark:bg-[#3D4F4F] 
                       text-gray-900 dark:text-gray-100 rounded-lg shadow-lg -top-12 left-0 w-64
                       border border-[#E9B893] dark:border-gray-600"
            >
              {tooltipInfo[label]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        {type === "select" ? (
          <select
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-[#E9B893] dark:border-gray-600 rounded-lg 
                     bg-[#F3EDE5] dark:bg-[#3D4F4F] text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-[#E9B893] dark:focus:ring-blue-500 focus:border-transparent
                     transition-colors duration-200"
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              type="number"
              value={value}
              onChange={onChange}
              className="w-full px-4 py-2 border border-[#E9B893] dark:border-gray-600 rounded-lg 
                       bg-[#F3EDE5] dark:bg-[#3D4F4F] text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-[#E9B893] dark:focus:ring-blue-500 focus:border-transparent
                       transition-colors duration-200 pr-12"
            />
            {suffix && (
              <span className="absolute right-3 top-2 text-gray-600 dark:text-gray-400">
                {suffix}
              </span>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export function ChurnCalculator() {
  const [initialMembers, setInitialMembers] = useState(100);
  const [subscriptionFee, setSubscriptionFee] = useState(49);
  const [growthRate, setGrowthRate] = useState(0.4);
  const [initialChurnRate, setInitialChurnRate] = useState(0.2);
  const [churnReductionRate, setChurnReductionRate] = useState(0.02);
  const [targetChurnRate, setTargetChurnRate] = useState(0.05);
  const [months, setMonths] = useState(12);
  const [currency, setCurrency] = useState("€");
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRevenue = useCallback(() => {
    let members = initialMembers;
    let baselineMembers = initialMembers;
    let churnRate = initialChurnRate;
    const data: CalculationResult[] = [];

    for (let month = 1; month <= months; month++) {
      // Calculate with churn reduction
      const newMembers = members * growthRate;
      const churnedMembers = members * churnRate;
      members = members + newMembers - churnedMembers;
      const monthlyRevenue = members * subscriptionFee;

      // Calculate baseline (no churn reduction)
      const baselineNewMembers = baselineMembers * growthRate;
      const baselineChurnedMembers = baselineMembers * initialChurnRate;
      baselineMembers = baselineMembers + baselineNewMembers - baselineChurnedMembers;
      const baselineMonthlyRevenue = baselineMembers * subscriptionFee;

      // Reduce churn rate for next month
      churnRate = Math.max(targetChurnRate, churnRate - churnReductionRate);

      data.push({
        month,
        members,
        monthlyRevenue,
        baselineMembers,
        baselineMonthlyRevenue,
        churnRate,
      });
    }

    setResults(data);
  }, [initialMembers, subscriptionFee, growthRate, initialChurnRate, 
      churnReductionRate, targetChurnRate, months]);

  // Now use it in useEffect
  useEffect(() => {
    if (hasCalculated) {
      calculateRevenue();
    }
  }, [hasCalculated, calculateRevenue]);

  const handleFirstCalculation = () => {
    setHasCalculated(true);
    calculateRevenue();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <InputField
            label="Initial Members"
            value={initialMembers}
            onChange={(e) => setInitialMembers(Number(e.target.value))}
          />
          <InputField
            label="Monthly Fee"
            value={subscriptionFee}
            onChange={(e) => setSubscriptionFee(Number(e.target.value))}
            suffix={currency}
          />
          <InputField
            label="Growth Rate"
            value={growthRate * 100}
            onChange={(e) => setGrowthRate(Number(e.target.value) / 100)}
            suffix="%"
          />
          <InputField
            label="Initial Churn"
            value={initialChurnRate * 100}
            onChange={(e) => setInitialChurnRate(Number(e.target.value) / 100)}
            suffix="%"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <InputField
            label="Monthly Churn Reduction"
            value={churnReductionRate * 100}
            onChange={(e) => setChurnReductionRate(Number(e.target.value) / 100)}
            suffix="%"
          />
          <InputField
            label="Target Churn"
            value={targetChurnRate * 100}
            onChange={(e) => setTargetChurnRate(Number(e.target.value) / 100)}
            suffix="%"
          />
          <InputField
            label="Months"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          <InputField
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            type="select"
            options={["€", "$", "£"]}
          />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {!hasCalculated && (
          <motion.button
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFirstCalculation}
            className="w-full mt-8 px-4 py-2 
              bg-[rgb(var(--background-secondary))] hover:bg-[rgb(var(--background-tertiary))]
              dark:bg-[rgb(var(--text-secondary))] dark:hover:bg-[rgb(var(--text-tertiary))]
              text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]
              rounded-lg transition-colors duration-200 font-medium"
          >
            Calculate Impact
          </motion.button>
        )}

        {results.length > 0 && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="p-6 bg-[#F3EDE5] dark:bg-[#3D4F4F] rounded-lg shadow-lg 
                        border border-[#E9B893] dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">Final Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {currency}{Math.round(results[results.length - 1].monthlyRevenue).toLocaleString()}
              </p>
            </div>
            <div className="p-6 bg-[#F3EDE5] dark:bg-[#3D4F4F] rounded-lg shadow-lg 
                        border border-[#E9B893] dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">Revenue Increase</p>
              <p className="text-2xl font-bold text-[#F99D7C] dark:text-[#E9B893]">
                {currency}{Math.round(
                  results[results.length - 1].monthlyRevenue - 
                  results[results.length - 1].baselineMonthlyRevenue
                ).toLocaleString()}
              </p>
            </div>
            <div className="p-6 bg-[#F3EDE5] dark:bg-[#3D4F4F] rounded-lg shadow-lg 
                        border border-[#E9B893] dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">Final Members</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round(results[results.length - 1].members).toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 