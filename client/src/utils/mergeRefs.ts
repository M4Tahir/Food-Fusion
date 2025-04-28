import { MutableRefObject, Ref, RefCallback, RefObject } from "react";

/**
 * Merges multiple React refs into a single callback ref function.
 *
 * React refs come in two forms:
 *
 * 1. Callback Refs (Function Refs):
 *    - Functions that React calls with the DOM node/component instance (or null on unmount)
 *    - Provide direct access to elements at the exact moment they're available in the DOM
 *    - Common scenarios where refs are functions:
 *      a) Explicit callback refs for immediate DOM manipulation:
 *         ```jsx
 *         const handleRef = (element) => {
 *           if (element) element.focus();
 *         };
 *         return <input ref={handleRef} />;
 *         ```
 *      b) When using forwardRef where the parent passes a callback:
 *         ```jsx
 *         const CustomInput = React.forwardRef((props, ref) => {
 *           // ref here will be a function if the parent passed a callback ref
 *           return <input ref={ref} {...props} />;
 *         });
 *         ```
 *      c) With useImperativeHandle for exposing custom methods:
 *         ```jsx
 *         function Parent() {
 *           const childRef = (methods) => {
 *             if (methods) methods.doSomething();
 *           };
 *           return <Child ref={childRef} />;
 *         }
 *         ```
 *      d) Library-provided refs that need real-time element access
 *
 * 2. Object Refs:
 *    - Created with React.createRef() or the useRef() hook
 *    - Maintain a mutable .current property that persists across renders
 *    - Most common way to use refs in modern React:
 *      ```jsx
 *      const inputRef = useRef(null);
 *      // Later: inputRef.current.focus();
 *      return <input ref={inputRef} />;
 *      ```
 *    - Unlike callback refs, object refs don't execute code when the element mounts
 *    - Their .current property is simply updated by React when the element mounts/unmounts
 *
 * This utility handles both types appropriately:
 * - For callback refs: calls the function with the node
 * - For object refs: updates the .current property
 *
 * Common use case: When a component needs to both use a ref internally and forward it to a parent:
 * ```jsx
 * function EnhancedInput({ forwardedRef, ...props }) {
 *   const internalRef = useRef(null);
 *
 *   const handleKeyDown = (e) => { ... };
 *
 *   useEffect(() => {
 *     internalRef.current.addEventListener('keydown', handleKeyDown);
 *     return () => {
 *       internalRef.current.removeEventListener('keydown', handleKeyDown);
 *     };
 *   }, []);
 *
 *   return <input ref={mergeRefs(internalRef, forwardedRef)} {...props} />;
 * }
 * ```
 *
 * @returns A single callback ref that updates all provided refs
 * @param inputRefs
 */

function mergeRefs<T>(...inputRefs: (Ref<T> | undefined)[]): Ref<T> | RefCallback<T> {

  const filteredInputRefs = inputRefs.filter(Boolean);

  if (filteredInputRefs.length <= 1) {
    const firstRef = filteredInputRefs[0];
    return firstRef || null;

  }

  return function mergedRefs(ref) {
    for (const inputRef of filteredInputRefs) {
      if (typeof inputRef === "function")
        inputRef(ref);
      else if (inputRef)
        (inputRef as RefObject<T | null>).current = ref;
    }

  };

}

export { mergeRefs };