export function debounce<T>(func: (...args: T[]) => void, timeout: number) {
  let time: number;

  return (...args: T[]) => {
    clearTimeout(time);
    time = setTimeout(() => func(...args), timeout);
  };
}
