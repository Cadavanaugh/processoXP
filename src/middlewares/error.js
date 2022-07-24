module.exports = (err, _req, res, _next) => {
  const { name, message, code } = err;
  switch (name) {
    case 'NotFoundError':
      return res.status(code).json({ message });
    case 'ValidationError':
      return res.status(code).json({ message });
    default:
      console.warn(err);
      return res.sendStatus(500);
  }
}