// Lightweight inline icons (stroke = currentColor) — no icon-library dependency.
interface IconProps {
  className?: string;
}

const base = (className?: string) => ({
  className,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const Aperture = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 2.5 14.6 9M21 8.3l-6.6 1.2M20 17.5 14 14m-3.5 7.5L13 14m-9.4 1.4 6.4-3.3M3.2 7l5.4 4" />
  </svg>
);

export const Copy = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Github = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const Sparkles = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 3l1.7 5.6L19 10l-5.3 1.4L12 17l-1.7-5.6L5 10l5.3-1.4z" />
    <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9z" />
  </svg>
);

export const RotateCcw = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M3 2v6h6" />
    <path d="M3.5 13a9 9 0 1 0 2-7.4L3 8" />
  </svg>
);

export const Star = ({ className }: IconProps) => (
  <svg {...base(className)} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.7 5.9 6.3.7-4.7 4.3 1.3 6.3L12 16.9 6.1 19.7l1.3-6.3L2.7 9.1l6.3-.7z" />
  </svg>
);

export const Shuffle = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);

export const Trash = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const ChevronDown = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Clock = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const AlertTriangle = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const AlertCircle = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

export const Info = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export const CheckCircle = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
    <path d="M22 4 12 14l-3-3" />
  </svg>
);
