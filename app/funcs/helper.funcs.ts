export const formatDate = (date: Date | undefined | null): string => {
  if (!date) return "No date";
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return "Invalid date";
  }
};

export const generateDates = (
  days: string[],
  startDate: Date,
  endDate: Date
): Date[] => {
  const dayMapping: { [key: string]: number } = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const selectedDayNumbers = days.map(day => dayMapping[day]);

  let returnDates: Date[] = [];

  endDate.setHours(23, 59, 59, 999);

  let currentDate = new Date(startDate);
  while(currentDate <= endDate) {
    if(selectedDayNumbers.includes(currentDate.getDay())){
      const sessionDate = new Date(currentDate);
      sessionDate.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
      returnDates.push(sessionDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return returnDates;
};
