import jwt from "jsonwebtoken";

// export const authUser = (req, res, next) => {
//     try {
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).json({ message: "user not autherised", success: false });
//         }

//         const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
//         if (!tokenVerified) {
//             return res.status(401).json({ message: "user not autherised", success: false });
//         }

//         req.user = tokenVerified;

//         next();
//     } catch (error) {
//         return res.status(401).json({ message: error.message || "user autherization failed", success: false });
//     }
// };


// export const authUser = (req, res, next) => {
//     try {
//         //const {token,email} = req.cookies

//          // Fetch token from cookies
//         const token = req.cookies.token;
//          console.log("TOKEN==", token)

//          console.log("SECRET KEY--", process.env.JWT_SK)

//          if (!process.env.JWT_SK) {
//             throw new Error("JWT secret or public key is not provided");
//         }

//          try {
//             const decoded = jwt.verify(token, process.env.JWT_SK); // or publicKey for RS256
//             console.log("DECODED:::", decoded);
//         } catch (err) {
//             console.error(err.message);
//         }


//         console.log("Request user-------", req.body)


//         // Check if the token is missing
//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Token missing, user not authenticated' });
//         }

//         // Verify and decrypt token
//         const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         if (!tokenVerified) {
//             return res.status(400).json({ success: false, message: 'Invalid token, user not authenticated' });
//         }

//         // Assign the user data from the token to req.user (usually id is included in the token)
//         req.user = tokenVerified
//         console.log(tokenVerified);
        
//         // Proceed to the next middleware
//         next();

//     } catch (error) {
//         // Handle token errors and other issues
//         console.error("Token verification error:", error);
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ success: false, message: 'Token expired, please log in again' });
//         }
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ success: false, message: 'Invalid token, not authorized' });
//         }
        
//         // Catch-all for other errors
//         res.status(500).json({ success: false, message: 'Authentication failed, not authorized' });
//     }
// };






export const authUser = (req, res, next) => {
    try {

        console.log("secret key--",process.env.JWT_Sk)
        console.log("cookoies--",req.cookies.token)
        const { token } = req.cookies;


        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token" });
          }
        
        //   try {
        //     const decoded = jwt.verify(token, "your_secret_key");
        //     req.user = decoded; // Attach user data to request
        //     next();
        //   } catch (error) {
        //     return res.status(403).json({ success: false, message: "Invalid token" });
        //   }

        console.log("token--", token) 
        

        console.log("secret key--",process.env.JWT_Sk)

        const tokenVerified = jwt.verify(token, process.env.JWT_SK);
        console.log("--TokenVerified--", tokenVerified)

        if (!tokenVerified) {
            return res.status(401).json({ message: "user not autherised", success: false });
        }


        req.user = tokenVerified;

        next();


      
       

        // if (!tokenVerified) {
        //     return res.status(401).json({ message: "user not autherised", success: false });
        // }


        // req.user = tokenVerified;
        // console.log("Hi==", req.user)
        // const userId = req.user.userId
        // console.log("USERID--",userId)

        // next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "user autherization failed", success: false });
    }
};
