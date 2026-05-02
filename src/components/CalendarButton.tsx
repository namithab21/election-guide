"use client"

import { Calendar } from 'lucide-react';

interface CalendarButtonProps {
  title: string;
  startDate: string; // YYYY-MM-DD
  details: string;
  className?: string;
}

export default function CalendarButton({ title, startDate, details, className }: CalendarButtonProps) {
  const generateGoogleCalendarLink = () => {
    const start = startDate.replace(/-/g, '');
    const end = start; // Same day for simplicity
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', title);
    url.searchParams.append('dates', `${start}/${end}`);
    url.searchParams.append('details', details);
    url.searchParams.append('sf', 'true');
    url.searchParams.append('output', 'xml');
    return url.toString();
  };

  return (
    <a
      href={generateGoogleCalendarLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Add ${title} to Google Calendar`}
    >
      <Calendar size={16} />
      <span>Add to Google Calendar</span>
    </a>
  );
}
