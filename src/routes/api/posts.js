// posts.js
//  ./src/api/posts.js
import { Router } from "express";
import * as postServices from "../../services/posts";

const router = Router();

// Get ALL Posts
router.get("/posts", async (req, res) => res.send(await postServices.getAll()));
// Get Post by ONE ID
router.get("/posts/:id", async (req, res) => {
  const post = await postServices.getById(req.params.id);
  post ? res.send(post) : res.status(404).end();
});
// To Create a New Posts
router.post("/posts", async (req, res) => {
  req.body.post
    ? res.send(await postServices.add(req.body.post))
    : res.status(400).send({ msg: ":(   Bad Request." });
});
// Put
router.put("/posts/:id", async (req, res) => {
  const post = await postServices.getById(req.params.id);
  req.body.post && post
    ? res.send(await postServices.update(req.body.post, req.params.id))
    : res.status(400).send({ msg: ":(   Bad Request." });
});
// Delete
router.delete("/posts/:id", async (req, res) => {
  const post = await postServices.getById(req.params.id);
  // If the Post Exists, delete it
  // If the Post DOES NOT exit, post a 404 and end the connection
  post
    ? res.send(await postServices.remove(req.params.id))
    : res.status(404).end();
});

export default router;
