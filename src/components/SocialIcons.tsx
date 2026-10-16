import type { ReactNode } from "react";
import { Youtube, Instagram } from "lucide-react";

const TikTokIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/** Icon for a social channel named in content/site.json. */
export function socialIcon(name: string, size = 20, className = ""): ReactNode {
  switch (name.toLowerCase()) {
    case "youtube":
      return <Youtube size={size} className={className} />;
    case "instagram":
      return <Instagram size={size} className={className} />;
    case "tiktok":
      return <TikTokIcon size={size} className={className} />;
    default:
      return null;
  }
}
