 import jwt from 'jsonwebtoken';

 const authMiddleware = async (req, res, next) => {
   // Add 'next' here
   const { token } = req.headers;
   if (!token) {
     return res.json({
       success: false,
       message: 'Not Authorized, login again',
     });
   }
   try {
     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
     req.body.userId = token_decode.id;
     next(); // Call next() to proceed
   } catch (error) {
     console.log(error);
     res.json({ success: false, message: 'Error' });
   }
 };

 export default authMiddleware;
