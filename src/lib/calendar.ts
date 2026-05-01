// src/lib/calendar.ts
export const generateCalendarLink = (title: string, dateStr: string, details: string) => {
  const date = new Date(dateStr);
  const start = date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  // Create an end date 1 hour later
  const endDate = new Date(date.getTime() + 60 * 60 * 1000);
  const end = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
