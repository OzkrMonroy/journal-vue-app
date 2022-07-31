export const getFormattedDate = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("default", {
    month: "long",
  });
  const year = new Date(date).toLocaleString("default", {
    year: "numeric",
    weekday: "long",
  });
  return { day, month, year };
};
