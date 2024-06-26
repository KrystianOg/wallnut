// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <Args extends any[]>(
  func: (...args: Args) => void,
  wait: number,
) => {
  let available = true;
  return (...args: Args): void => {
    if (!available) return;

    available = false;
    func(...args);

    setTimeout(() => {
      available = true;
    }, wait);
  };
};
