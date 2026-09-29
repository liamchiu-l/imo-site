export function formatEventDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getDateParts(dateString) {
  if (!dateString) return { month: "", day: "", year: "" };

  const date = new Date(`${dateString}T00:00:00`);

  return {
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(date.getDate()).padStart(2, "0"),
    year: date.getFullYear(),
  };
}