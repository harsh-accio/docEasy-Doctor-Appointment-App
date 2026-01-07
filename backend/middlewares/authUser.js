import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

  console.log(token);

  if (!token) {
    return res.send({ message: "Unauthorised access.." });
  }
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: token_decode.id };

  next();
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
};

export default authUser;
