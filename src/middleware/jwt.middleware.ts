import { expressjwt, TokenGetter, type Params } from 'express-jwt';

// Function used to extract the JWT token from the request's 'Authorization' Headers
const getTokenFromHeaders: TokenGetter = (req) => {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return;
}

// Define the JWT options
const jwtOptions: Params = {
  secret: process.env.TOKEN_SECRET as string, 
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders,
};

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt(jwtOptions);

// Export the middleware so that we can use it to create protected routes
export { isAuthenticated };
