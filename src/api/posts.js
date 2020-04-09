// posts.js
//  ./src/api/posts.js
import { Router } from "express";

const router = Router();

router.get("/posts", (req, res) => {
  res.json({ todo: "Get ALL Posts" });
});
// Get post with Dynamic route
router.get("/posts/:id", (req, res) => {
  res.json({ todo: `Get one post with id: ${req.params.id}` });
});
router.post("/posts", (req, res) => {
  res.json({ todo: "Add ONE Posts" });
});
router.put("/posts/:id", (req, res) => {
  res.json({ todo: `Updating one post with id: ${req.params.id}` });
});

router.delete("/posts/:id", (req, res) => {
  res.json({ todo: `Deleting one post with id: ${req.params.id}` });
});

export default router;
