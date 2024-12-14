"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeartIcon, ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

const LinkedInPost = ({ 
  name, 
  role,
  content,
  avatar,
  timestamp,
  likes,
  comments,
  shares,
  hashtags,
  delay = 0 
}: { 
  name: string;
  role: string;
  content: string;
  avatar: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  hashtags: string[];
  delay?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800"
    >
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-neutral-500">{role}</p>
          <p className="text-xs text-neutral-400 mt-1">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-base italic text-neutral-700 dark:text-neutral-300 leading-snug">
          "{content}"
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center text-xs text-neutral-500 mb-3">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-blue-500 mr-1" />
          <span>{likes} likes</span>
        </div>
        <div className="ml-auto">
          {comments} comments • {shares} shares
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
        <button className="flex items-center space-x-2 text-neutral-500 hover:text-blue-500">
          <HeartIcon className="w-5 h-5" />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center space-x-2 text-neutral-500 hover:text-blue-500">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center space-x-2 text-neutral-500 hover:text-blue-500">
          <ArrowPathRoundedSquareIcon className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </motion.div>
  );
};

export const SkeletonTwo = () => {
  const demoSpotlights = [
    {
      name: "Lukas Weber",
      role: "Tech Lead",
      content: "Innovation isn't about having all the answers, but asking the right questions. True disruption begins with curiosity and ends with impact.",
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2Fb0a4b1922813b989103a3616d7111562.png&w=400&q=75",
      timestamp: "2 hours ago",
      likes: 142,
      comments: 23,
      shares: 7,
      hashtags: ["Innovation", "Leadership", "TechTrends", "FutureOfWork"]
    },
    {
      name: "Anna Schmidt",
      role: "Product Manager",
      content: "The best products don't just solve problems - they create opportunities. Focus on building bridges, not just features.",
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2Fbb3d2a58ea153b635a4951d82affb4db.png&w=400&q=75",
      timestamp: "5 hours ago",
      likes: 284,
      comments: 45,
      shares: 12,
      hashtags: ["ProductStrategy", "Innovation", "UserExperience", "ProductManagement"]
    },
    {
      name: "Max Mueller",
      role: "UX Designer",
      content: "Design is not just what it looks like and feels like. Design is how it works. Simplicity is the ultimate sophistication in user experience.",
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F67b732b96785fd368415dd82951466c1.png&w=400&q=75",
      timestamp: "8 hours ago",
      likes: 193,
      comments: 31,
      shares: 9,
      hashtags: ["UXDesign", "Innovation", "DesignThinking", "UserCentric"]
    }
  ];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-full">
        {/* Scrollable content container - removed padding */}
        <div className="relative space-y-4 overflow-y-auto max-h-[500px]">
          {/* Posts container - moved padding here */}
          <div className="px-4">
            {/* Posts */}
            {demoSpotlights.map((spotlight, index) => (
              <LinkedInPost
                key={index}
                {...spotlight}
                delay={index * 0.2}
              />
            ))}
          </div>
          {/* Gradient inside the scrollable container */}
          <div 
            className="pointer-events-none sticky inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3EDE5] dark:from-[#1D3640] -mt-32" 
          />
        </div>
      </div>
    </div>
  );
};
