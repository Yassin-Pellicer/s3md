export const formatDate = (date: Date | undefined | null): string => {
  if (!date) return 'No date';
  try {
    return new Date(date).toLocaleDateString();
  } catch (error) {
    return 'Invalid date';
  }
};