import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 }
};

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  icon: React.ElementType;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

export const FormField = ({
  id,
  label,
  type,
  required,
  icon: Icon,
  value,
  onChange,
  error,
  disabled
}: FormFieldProps) => {
  return (
    <motion.div 
      variants={fadeIn}
      className="relative"
    >
      <label 
        className="block text-sm font-medium mb-1 dark:text-white" 
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          aria-hidden="true" 
        />
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full pl-10 pr-3 py-2 border rounded-lg 
            dark:bg-gray-800 dark:border-gray-700 dark:text-white 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}
          `}
          disabled={disabled}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}; 