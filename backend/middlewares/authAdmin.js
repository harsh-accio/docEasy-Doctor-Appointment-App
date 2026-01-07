import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  const { authtoken } = req.headers;
  // console.log(authtoken);

  if (!authtoken) {
    return res.send({ message: "Unauthorised access.." });
  }
  const token_decode = jwt.verify(authtoken, process.env.JWT_SECRET);
  if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    res.send({ message: "Email or Password incorrect.." });
  }
  next();
};

export default authAdmin;
