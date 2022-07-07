export function transformDateStringToLocale(date: string | Date): string {
  return (
    new Date(date || "").toLocaleDateString("en-US", {
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }) || "None"
  );
}

export function transformDateStringToShortLocale(date: string | Date): string {
  return (
    new Date(date || "").toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) || "None"
  );
}
