import { Star } from "lucide-react";
import { formatRating } from "@/lib/utils";

export default function RatingBadge({ value, size = "sm" }) {
  return <span className={`rating-badge ${size === "lg" ? "rating-large" : ""}`}><Star size={size === "lg" ? 16 : 13} fill="currentColor" /> {formatRating(value)}</span>;
}
