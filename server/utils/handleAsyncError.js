/**
 * A higher-order function that wraps asynchronous route handler functions in Express.
 * It ensures that any unhandled errors in the async function are caught and forwarded
 * to the global error handler middleware.
 *
 * @param {Function} fn - The asynchronous function (e.g., route handler) to be wrapped.
 *                         If an error occurs within this function, the error is passed
 *                         to the global error handler via `next()`.
 * @returns {Function} - A new function that, when invoked, executes the provided async
 *                       function and catches any errors, forwarding them to the global error handler.
 */
const handleAsyncError = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

export { handleAsyncError };
