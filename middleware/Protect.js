import { getCookie, getCookies } from 'cookies-next';
import {promisify} from 'util';
import { parseCookies } from '../utils/cookiesparser';
 
 const Protect = (handler) =>{
    return async (req, res) => {
        // Get token and check if it exists
        let token;
        

        const data = parseCookies(req)

        

      return handler(req,res)  
      };
 }

 export default Protect;