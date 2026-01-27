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

console.log(postSettings(0)); // "0"
console.log(postSettings(1)); // "1"
console.log(postSettings(999)); // "999"
console.log(postSettings(1000)); // "1k"
console.log(postSettings(1500)); // "1.5k"
console.log(postSettings(1000000)); // "1M"
