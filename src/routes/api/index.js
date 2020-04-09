// index.js
//  ./src/api/index.js
import { Router } from "express";

import postsRoute from "./posts";

const router = Router();

router.get("/api", (req, res) => {
  res.json({ msg: "Hello from API" });
});

// api/posts will use /posts Controller
//  This appends /posts to /api
router.use("/api", postsRoute);

export default router;
