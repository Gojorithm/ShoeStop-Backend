
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check whether the request contains an authorization header
    if (!authHeader) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    // Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Invalid authorization format'
        });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request
        req.user = decoded;

        console.log(req.user);

        // Continue to the next middleware or route
        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Not authorized to access this route'
        });
    }
});

module.exports = authenticationMiddleware;






// const jwt = require('jsonwebtoken')
// const asyncHandler = require("express-async-handler")


// const authenticationMiddleware = asyncHandler(  async (req, res, next) => {
//     const authHeader = req.headers.authorization
  
//     if (!authHeader) {
//       throw new UnauthenticatedError('No token provided')
//     }
  
//     const token = authHeader.split(' ')[1]
//     // console.log(token);
  
//     try {
//       const decoded =  jwt.verify(token, process.env.JWT_SECRET)
      
//       req.user = decoded
//       console.log(req.user);
//       next()
//     } catch (error) {
//       throw new UnauthenticatedError('Not authorized to access this route')
//     }
//   } )

// module.exports = authenticationMiddleware