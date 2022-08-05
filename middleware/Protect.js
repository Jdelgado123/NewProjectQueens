 import {promisify} from 'util';
 
 const Protect = (handler) =>{
    return async (req, res) => {
        // Get token and check if it exists
        let token;
    
        if (req.cookies && req.cookies.jwt) {
          token = req.cookies.jwt;
        }
    
        if (!token) {
          return res.status(200).json({
            success: false,
            message: 'Please log in to get access.',
          });
        }
    
        try {
          // Verify token
          const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
          );
    
          // Check if user exists with refresh token
          
    
          // Grant access to protected rout
    

        } catch (error) {
          return res.status(200).json({
            success: false,
            message: 'Please log in to get access.',
          });
        }
      };
 }

 export default Protect;