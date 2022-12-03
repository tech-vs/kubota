import jwt from "jsonwebtoken";
const secret_key = "12344321";

export const sign = (payload: any) => {
  return jwt.sign(payload, secret_key);
};

export const verify = (req: any, res: any, next: any) => {
  var token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });
  jwt.verify(token, secret_key, function (err: any, decoded: any) {
    if (err) {
      if (err.name == "TokenExpiredError") {
        return res.status(401).json({ auth: false, message: "token expired" });
      } else {
        return res.status(500).json({ auth: false, message: err });
      }
    }

    // if everything good, save to request for use in other routes
    req.username = decoded.username;
    req.level = decoded.level;
    next();
  });
};
