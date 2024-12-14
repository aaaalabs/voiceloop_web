"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, Sparkles, Clock, Target, Users, LinkedinIcon, MessageCircle, Loader2, PenLine } from "lucide-react";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Analytics } from '@/lib/analytics';
import { toast } from 'sonner';
import { z } from 'zod';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/error-boundary';
import { Testimonials } from '@/components/testimonials';
import { MinimalFooter } from '@/components/MinimalFooter';
import { getCurrentKpis, type MvCurrentKpis } from "@/db";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  aaaProfile: string;
  preferredContact: 'email' | 'linkedin' | 'aaa';
}

interface Challenge {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string | null;
  career_stage: string | null;
  content: string | null;
  image_url: string | null;
  logo_url: string | null;
}

interface ErrorResponse {
  response?: string;
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  linkedin: z.string().url().optional(),
  aaaProfile: z.string().url().optional(),
  preferredContact: z.enum(['email', 'linkedin', 'aaa'])
});

interface SurveyPageProps {
  currentKpis: MvCurrentKpis | null;
  testimonials: Testimonial[];
  userName: string;
  userId: string;
}

export const SurveyPage = ({ currentKpis, testimonials, userName, userId }: SurveyPageProps) => {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [stayLonger, setStayLonger] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customChallenge, setCustomChallenge] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const startTime = useRef(performance.now());
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const challenges: Challenge[] = [
    {
      id: 'networking',
      icon: Users,
      title: 'Meaningful Connections',
      description: 'Find and connect with the right people for collaborations and growth opportunities'
    },
    {
      id: 'accountability',
      icon: Target,
      title: 'Staying Accountable',
      description: 'Having someone to share progress and challenges with'
    },
    {
      id: 'time',
      icon: Clock,
      title: 'Time Management',
      description: 'Making the most of my limited time in the program'
    },
    {
      id: 'custom',
      icon: PenLine,
      title: 'Something Else',
      description: 'Share your specific challenge...'
    }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://hook.eu1.make.com/pfpw4duxtcysfdtg60sei97s8t507pj7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          name: userName,
          selectedChallenge: choice,
          customChallenge: choice === 'custom' ? customChallenge : null,
          stayLongerResponse: stayLonger,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data: ErrorResponse = await response.json();

      if (response.ok) {
        // Track successful submission
        Analytics.track('form_submitted', { 
          timeToComplete: performance.now() - startTime.current,
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        confetti();
        toast.success('Survey submitted successfully!');
        setShowThankYou(true);
      } else {
        setErrorMessage(data.response || 'Something went wrong. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      setShowErrorModal(true);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render thank you page with personalized message
  const renderThankYou = () => (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6"
      >
        <Sparkles className="w-10 h-10 text-green-600 dark:text-green-400" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.h3
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ 
            backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 
          bg-[size:300%] bg-clip-text text-transparent"
        >
          Thank you, {userName}!
        </motion.h3>
        <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
          We appreciate your valuable feedback<br />
          and will be in touch soon with updates about new features.
        </p>
        <Button
          onClick={() => {
            setShowThankYou(false);
            router.push('https://voiceloop.io');
          }}
          className="px-6 py-2.5 rounded-full font-medium transition-all duration-200
            bg-black hover:bg-neutral-800
            dark:bg-white dark:hover:bg-neutral-200
            text-white dark:text-black"
        >
          <span className="flex items-center gap-2">
            Return to Homepage
            <ChevronRight className="w-4 h-4" />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );

  // Modified step 2 to include submit button
  const renderStep2 = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-center mb-6 text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]">
        If we solved this for you, would you stay longer in AAA?
      </h4>
      <div className="space-y-4">
        {['Absolutely!', 'Maybe', 'Not really'].map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setStayLonger(option);
            }}
            disabled={isSubmitting}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-200 
              bg-[rgb(var(--background-tertiary))] dark:bg-[rgb(var(--text-tertiary))] 
              text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]
              shadow-md hover:shadow-xl ${
              stayLonger === option 
                ? 'border-[rgb(var(--accent-primary))] bg-[rgb(var(--background-secondary))]/50 dark:bg-[rgb(var(--text-secondary))]/50' 
                : 'border-[rgb(var(--background-secondary))] dark:border-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent-primary))]'
            }`}
          >
            <span className="text-lg font-medium">{option}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setStep(0)}
        className="mx-auto mt-8 flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-[#F3EDE5] dark:hover:bg-[#1D3640]"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to previous question
      </motion.button>
    </div>
  );

  // Add renderStep1 function
  const renderStep1 = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-center mb-6 dark:text-white">
        Which challenge, if solved, would make everything else easier?
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (item.id === 'custom') {
                setShowCustomModal(true);
              } else {
                setChoice(item.id);
                setStep(1); // Immediately advance to step 2 for non-custom choices
              }
            }}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left 
              bg-[rgb(var(--background-tertiary))] dark:bg-[rgb(var(--text-tertiary))]
              text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]
              shadow-md hover:shadow-xl ${
              choice === item.id 
                ? 'border-[rgb(var(--accent-primary))] bg-[rgb(var(--background-secondary))]/50 dark:bg-[rgb(var(--text-secondary))]/50' 
                : 'border-[rgb(var(--background-secondary))] dark:border-[rgb(var(--text-secondary))] hover:border-[rgb(var(--accent-primary))]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                choice === item.id 
                  ? 'bg-[rgb(var(--background-secondary))] dark:bg-[rgb(var(--text-secondary))]' 
                  : 'bg-[rgb(var(--background-secondary))] dark:bg-[rgb(var(--text-secondary))]'
              }`}>
                <item.icon className={`w-5 h-5 ${
                  choice === item.id 
                    ? 'text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]' 
                    : 'text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]'
                }`} />
              </div>
              <div>
                <div className="font-medium dark:text-white">{item.title}</div>
                <div className="text-sm text-gray-600 dark:text-[rgb(var(--background-secondary))]">
                  {item.description}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  // Add this useEffect to handle the submission after stayLonger is updated
  useEffect(() => {
    if (stayLonger && step === 1) {
      handleSubmit();
    }
  }, [stayLonger, step, handleSubmit]);

  const renderErrorModal = () => (
    <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
      <DialogContent className="sm:max-w-[525px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30">
              <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            One Quick Note
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Thanks for sharing your thoughts! We couldn't process your last response because:
          </p>
          <div className="mt-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <p className="text-orange-800 dark:text-orange-200 font-medium">
              {errorMessage}
            </p>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            No worries though! You can try again later or reach out to our team for assistance.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setShowErrorModal(false);
              router.push('https://voiceloop.io');
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Return to Homepage
              <ChevronRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Add useEffect for auto-redirect after thank you
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    if (showThankYou) {
      redirectTimer = setTimeout(() => {
        router.push('https://voiceloop.io');
      }, 6000);
    }
    return () => clearTimeout(redirectTimer);
  }, [showThankYou, router]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {/* Header outside of any loading states or animations */}
      {!showThankYou && (
        <header className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center px-4 bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--text-primary))]">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Hi {userName}! Help Shape{' '}
            <br className="hidden sm:block" />
            the Future of{' '}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              our AAA Accelerator
            </span>
          </h1>
        </header>
      )}

      {/* Rest of the content */}
      <div className="min-h-screen bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--text-primary))]">
        <Head>
          <title>AAA Community Survey</title>
          <meta name="description" content="Help shape the future of AAA Community by sharing your insights" />
        </Head>

        {/* Main survey content */}
        <AnimatePresence mode="sync">
          {showThankYou ? (
            <div className="h-screen flex items-center justify-center px-4">
              {renderThankYou()}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-4 mb-20 min-h-[500px] flex items-center justify-center">
              {step === 0 && renderStep1()}
              {step === 1 && renderStep2()}
            </div>
          )}
        </AnimatePresence>

        {/* Only show testimonials and CTA if not in thank you state */}
        {!showThankYou && (
          <>
            {/* Social Proof Section */}
            <div className="bg-[#F3EDE5] dark:bg-[#1D3640] py-20">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h3 className="text-2xl font-bold mb-8 dark:text-white">
                  Join these AAA members in shaping the future
                </h3>
                <Testimonials testimonials={testimonials}/>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-[#F3EDE5] dark:bg-[#1D3640] py-24">
              <div className="mx-auto w-full relative z-20 sm:max-w-[40rem] md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-[24px] overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-400 dark:bg-blue-500 opacity-10 mix-blend-multiply" />
                  <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-purple-400 dark:bg-purple-500 opacity-10 mix-blend-multiply" />
                </div>

                {/* Content container */}
                <div className="relative px-6 py-16 sm:py-20 sm:px-12 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                    Ready to help shape the future of our Community?
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Your insights will directly influence the features we build next.
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Take the Survey
                        <svg 
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 rounded-full bg-white/20 blur-sm group-hover:blur-md transition-all duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <MinimalFooter />

        {/* Toast notifications container */}
        <Toaster position="bottom-right" />

        {/* Custom Challenge Modal with mobile-friendly padding */}
        <Dialog open={showCustomModal} onOpenChange={setShowCustomModal}>
          <DialogContent className="sm:max-w-[425px] bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--text-primary))] shadow-xl p-4 sm:p-6 
            !top-[100px] !block !translate-y-0 !h-auto border dark:border-[rgb(var(--background-secondary))]"
          >
            <DialogHeader className="border-b border-[rgb(var(--background-secondary))] dark:border-[rgb(var(--background-tertiary))] pb-4">
              <DialogTitle className="text-xl font-semibold text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]">
                Describe Your Challenge
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <textarea
                placeholder="What's your biggest challenge in AAA?"
                className="w-full p-3 rounded-lg border-2 border-[rgb(var(--background-secondary))] 
                  dark:border-[rgb(var(--background-tertiary))] 
                  bg-[rgb(var(--background-primary))] dark:bg-[rgb(var(--text-secondary))]
                  text-[rgb(var(--text-primary))] dark:text-[rgb(var(--background-primary))]
                  focus:border-[rgb(var(--accent-primary))] focus:ring-2 focus:ring-[rgb(var(--accent-primary))] 
                  placeholder:text-gray-500 dark:placeholder:text-[rgb(var(--background-tertiary))]
                  transition-colors"
                rows={3}
                value={customChallenge}
                onChange={(e) => setCustomChallenge(e.target.value)}
              />
              {customChallenge.length <= 1 && (
                <p className="text-center text-sm text-[rgb(var(--text-secondary))] dark:text-[rgb(var(--background-secondary))] font-medium">
                  Please provide more detail about your challenge
                </p>
              )}
              
              <Button
                onClick={() => {
                  if (customChallenge.length > 1) {
                    setShowCustomModal(false);
                    setChoice('custom');
                    setStep(1);
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                  text-white font-medium"
                disabled={customChallenge.length <= 1}
              >
                Continue
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {renderErrorModal()}
      </div>
    </ErrorBoundary>
  );
};

// Error Fallback Component
const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <Button onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  </div>
); 