import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message: "User not authenticated",
                success: false
            })
        }

        // Verify jwtToken
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                messaeg: "Invalid token",
                success: true
            })
        }

        // Binding the authenticated user’s ID to the request object
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        
    }
}

export default isAuthenticated;