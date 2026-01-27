export function postSettings(count: number): string {
  if (!count) {
    return "0 posts";
  }

  if (count === 1) {
    return count + " post";
  }

  if (count < 1000) {
    return count + " posts";
  }

  if (count < 1_000_000) {
    return `${(count / 1000).toFixed(1)}k posts`;
  }

  return `${(count / 1_000_000).toFixed(1)}M posts`;
}
