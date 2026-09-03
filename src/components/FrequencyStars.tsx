export function FrequencyStars({ frequency }: { frequency: 3 | 4 | 5 }) {
  return <span className="frequency-stars">{'★'.repeat(frequency)}</span>
}
