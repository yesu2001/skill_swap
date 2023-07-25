// Utility function to get the current date in the format "date-month-year"
export const getCurrentDateFormatted = () => {
  const today = new Date();

  // Get the day, month, and year components
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Format the date as "date-month-year"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
