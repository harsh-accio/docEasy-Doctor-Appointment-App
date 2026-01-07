import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const doctortoken = req.headers.doctortoken;
    console.log(doctortoken);
    

    if (!doctortoken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const decoded = jwt.verify(doctortoken, process.env.JWT_SECRET);

    // ✅ IMPORTANT: use req.doctor (NOT req.user, NOT req.body)
    req.doctor = { id: decoded.id };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authDoctor;
 