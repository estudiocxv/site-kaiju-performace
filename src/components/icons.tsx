type P = { size?: number; className?: string };

export const ArrowRight = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const WhatsApp = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.23 3.7 8.23 8.24 0 4.54-3.69 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z"
    />
  </svg>
);

export const Instagram = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </svg>
);

export const MapPin = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
