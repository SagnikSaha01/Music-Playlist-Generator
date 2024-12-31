export const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session); // Log session info
    if (req.session && req.session.userId) {
      return next(); // Proceed to the next middleware or route handler
    }
    res.status(401).json({ message: 'Unauthorized: Please log in to access this resource.' });
  };