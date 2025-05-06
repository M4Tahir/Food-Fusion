import { useEffect, useRef } from 'react';

/**
 * This function is used to `close` model using `close()`provided.
 * @param close The function used to close the mode.
 * @param captureEvent If true, sets the event listener in the capture phase instead of the bubbling phase.
 */
const useClickOutside = <T extends HTMLElement>(close: () => void, captureEvent = true) => {
	const ref = useRef<T>(null);
	useEffect(() => {
		function onClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
			}
		}

		document.addEventListener('click', onClick, captureEvent);

		return () => document.removeEventListener('click', onClick, captureEvent);
	}, [captureEvent, close]);

	return ref;
};

export { useClickOutside };
