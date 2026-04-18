export default function errorHandler(err, _req, res, _next) {
  console.error('[Error]', err.stack || err.message);

  const status  = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred. Please try again later.'
    : err.message;

  res.status(status).json({ success: false, message });
}
