import { Step } from 'react-joyride';

export const TOUR_STEPS: Step[] = [
  {
    target: 'body',
    placement: 'center',
    title: 'ברוכים הבאים למטאור!',
    content: 'בואו נעבור סיור קצר במערכת לניהול משאבים ופקודות מבצע.',
  },
  {
    target: '.sidebar-container',
    title: 'ניווט במערכת',
    content: 'כאן תוכלו לעבור בין המסכים השונים: דשבורד, ניהול משאבים ופקודות מבצע.',
    placement: 'left',
  },
  {
    target: '[data-tour="dashboard-menu"]',
    title: 'דשבורד',
    content: 'תמונת מצב בזמן אמת של כל המשאבים והקישוריות במערך.',
  },
  {
    target: '[data-tour="operations-menu"]',
    title: 'פקודות מבצע',
    content: 'כאן מתכננים ומנהלים את כל פקודות המבצע וההקצאות.',
  },
  {
    target: '[data-tour="resources-menu"]',
    title: 'ניהול משאבים',
    content: 'ניהול מלא של כל הישויות: תחנות, לווינים, טרמינלים ורשתות.',
  },
  {
    target: '[data-tour="edit-layout"]',
    title: 'התאמה אישית',
    content: 'תוכלו לשנות את פריסת הדשבורד ומיקומי הווידג׳טים בקלות.',
  },
  {
    target: '[data-tour="time-selector"]',
    title: 'בחירת זמן',
    content: 'צפו בתמונת המצב של המערכת בנקודות זמן שונות בעתיד או בעבר.',
  },
];
