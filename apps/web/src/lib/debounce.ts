// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <Args extends any[]>(
  func: (...args: Args) => void,
  wait: number,
) => {
  let timeoutId: number | undefined = undefined;
  return (...args: Args): void => {
    const later = () => {
      clearTimeout(timeoutId);
      func(...args);
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
  };
};
