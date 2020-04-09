// posts.js
//  ./src/api/posts.js
import { Router } from "express";
import * as postServices from "../../services/posts";
import auth from "../../helpers/auth";

const router = Router();

// Getters
// Get ALL posts
router.get("/posts", async (req, res) => res.send(await postServices.getAll()));
// Get ONE post
router.get("/posts/:id", async (req, res) => {
  const post = await postServices.getById(req.params.id);
  post ? res.send(post) : res.status(404).end();
});

// Creating a New Post
// If you are not authenticated, you cannot proceed
router.post("/posts", auth, async (req, res) => {
  req.body.post
    ? res.send(await postServices.add(req.body.post))
    : res.status(400).send({ msg: ":(   Bad Request." });
});

// Modifying Posts
//
// Put
// If you need to modify a post, you need to be authenticated
router.put("/posts/:id", auth, async (req, res) => {
  const post = await postServices.getById(req.params.id);
  req.body.post && post
    ? post.author.id == req.user.id
      ? res.send(await postServices.update(req.body.post, req.params.id))
      : res.status(401).end()
    : res.status(400).send({ msg: ":(   Bad Request." });
});
// Delete
// If you want to delete a post, you need to be authenticated
router.delete("/posts/:id", auth, async (req, res) => {
  const post = await postServices.getById(req.params.id);
  // If the Post Exists, delete it
  // If the Post DOES NOT exit, post a 404 and end the connection
  post
    ? post.author.id == req.user.id
      ? res.send(await postServices.remove(req.params.id))
      : res.status(401).end()
    : res.status(404).end();
});

export default router;
