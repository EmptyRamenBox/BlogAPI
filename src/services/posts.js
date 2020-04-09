import Joi from "@hapi/joi";
import db from "../helpers/db";

// Information that will be handled by the application
// Specify Required information
const postSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  author: Joi.string().required(),
});

// router.post
// Create Programmically the objects above
// Before we send the informaiton, we need to validate it
const createNewPostObject = (data) => {
  const { error, value } = postSchema.validate(data);
  return !error
    ? {
        // If the error does not exist, I will send all of my values
        ...value,
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
      }
    : { error };
};

// router.put
// For an already existing Post object...
// Validate information before being sent out
const createPostObject = (data) => {
  const { error, value } = postSchema.validate(data);
  return !error
    ? {
        // If the error does not exist, I will send all of my values
        ...value,
        updated: new Date().toLocaleString(),
      }
    : { error };
};

// router.get /posts
// return the existing posts
export const getAll = async () => {
  const posts = await db("posts");
  const postsPromises = posts.map(async (post) => {
    const author = await db("users").where({ id: post.author }).first();
    post.author = author;
    return posts;
  }); // mapping the object (posts.map) to the author (id: post.author)

  return await Promise.all(postsPromises);
};

//  router.get /posts/:id
// Send ID
// Return Something
//  Posts is gonna get from Posts table, ONLY when the ID is equal to the ID i am sending
//      ie. id === id
//      We are only going to return the first ID in the array
export const getById = async (id) => {
  const post = await db("posts").where({ id }).first();
  if (post) {
    const author = await db("users").where({ id: post.author }).first();
    return { ...post, author };
  } else {
    return null;
  }
};

// Adding Posts
export const add = async (post) => {
  const postObject = createNewPostObject(post); // create post object by validating post
  if (!postObject.error) {
    const id = await db("posts").insert(post); // .retuning Knew Doc
    return await getById(id[0]);
  } else {
    // if an error occurs
    return postObject; // Because we are returning an error
  }
};

// Update
export const update = async (post, id) => {
  console.log(post);
  // verify if it exists first
  if (await getById(id)) {
    const postObject = createPostObject(post);
    if (!postObject.error) {
      await db("posts").where({ id }).update(postObject);
      return await getById(id);
    } else {
      return postObject;
    }
  } else {
    return null;
  }
};

// Remove
export const remove = async (id) => {
  await db("posts").where({ id }).del();
  return { msg: "Ok" };
};
