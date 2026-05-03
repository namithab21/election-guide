"use client";

import React from 'react';
import { Calendar } from 'lucide-react';
import { generateGoogleCalendarLink } from '@/lib/google-calendar';

interface CalendarButtonProps {
  title: string;
  startDate: string; // YYYY-MM-DD
  details: string;
  className?: string;
}

export default function CalendarButton({ title, startDate, details, className }: CalendarButtonProps) {
  const link = generateGoogleCalendarLink(title, startDate, details);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-all ${className}`}
      aria-label={`Add ${title} to Google Calendar`}
    >
      <Calendar size={14} />
      <span>Add to Calendar</span>
    </a>
  );
}
