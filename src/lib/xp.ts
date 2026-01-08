export function getBookXpMultiplier(book: string): number {
  const bookLower = book.toLowerCase();
  
  if (bookLower.includes('1a') || bookLower.includes('1b')) return 1;
  if (bookLower.includes('2a') || bookLower.includes('2b')) return 1.5;
  if (bookLower.includes('3a') || bookLower.includes('3b')) return 2.5;
  if (bookLower.includes('4a') || bookLower.includes('4b')) return 4;
  
  return 1;
}

export function calculateExerciseXp(baseXp: number, book: string, isCorrect: boolean = true): number {
  if (!isCorrect) return Math.max(1, Math.floor(baseXp * 0.1));
  
  const multiplier = getBookXpMultiplier(book);
  return Math.floor(baseXp * multiplier);
}
