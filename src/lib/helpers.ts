/**
 * Call a function on document ready
 * @param fn The function to call
 */
export function ready(fn: () => void) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

/**
 * Determine if an element has a class name
 * @param el The element to check
 * @param className The class name
 */
export function hasClass(el: Element, className: string) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

/**
 * Add a class to an element
 * @param el The element to add the class to
 * @param className The class to add
 */
export function addClass(el: Element, className: string) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`;
  }
}
