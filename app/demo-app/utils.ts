import { COMPANY_COLORS, COLORS } from "./constants";

// Generate a unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Get current ISO timestamp
export function getTimestamp(): string {
  return new Date().toISOString();
}

// Format a date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

// Format date for form inputs (YYYY-MM-DD)
export function formatDateForInput(dateString: string): string {
  return new Date(dateString).toISOString().split("T")[0];
}

// Get initials from a name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Get company color or fallback
export function getCompanyColor(company: string): string {
  return COMPANY_COLORS[company] || COLORS.gray;
}

// Debounce function for localStorage writes
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Pluralize helper
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

// Sort by date (newest first)
export function sortByDateDesc<T extends { createdAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Filter helpers
export function filterByStatus<T extends { status: string }>(
  items: T[],
  status: string
): T[] {
  return items.filter((item) => item.status === status);
}

// Group items by a key
export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Map<T[K], T[]> {
  const map = new Map<T[K], T[]>();
  for (const item of items) {
    const value = item[key];
    const existing = map.get(value) || [];
    existing.push(item);
    map.set(value, existing);
  }
  return map;
}

// Check if a string is empty or whitespace only
export function isEmpty(str: string | undefined | null): boolean {
  return !str || str.trim().length === 0;
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}
