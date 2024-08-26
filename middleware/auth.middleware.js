const jwt=require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log("Received token:", token);
        jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err.message);
                return res.status(401).json({ msg: "Invalid token. Please login again." });
            }
            console.log("Decoded token:", decoded);
            req.body.user = decoded.userID;
            next();
        });
    } else {
        res.status(401).json({ msg: "No token provided. Please login first." });
    }
};


module.exports={authenticate}
