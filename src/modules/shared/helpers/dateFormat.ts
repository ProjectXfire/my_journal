const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formattingDate = (date: number) => {
  if (!(typeof date === "number")) return "Invalid date";
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  return `on ${day} ${month}, ${fullYear}`;
};
