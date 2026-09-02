export function delegateEvent(
  container: Element,
  eventType: keyof HTMLElementEventMap,
  selector: string,
  handler: (event: Event, target: Element) => void,
): () => void {
  const listener = (event: Event) => {
    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const matched = target.closest(selector)

    if (matched && container.contains(matched)) {
      handler(event, matched)
    }
  }

  container.addEventListener(eventType, listener)

  return () => {
    container.removeEventListener(eventType, listener)
  }
}

