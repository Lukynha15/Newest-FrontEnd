export function settingsLike(count: number) {
  if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k `;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M `;
  } else {
    return count;
  }
}
