import admin from "../firebase/firebaseAdmin.js";

const protect = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken =
      await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

export default protect;