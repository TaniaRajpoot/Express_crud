import express from "express";
const router = express.Router();

//setup staric folder
// app.use(express.static(path.join(__dirname,'public')));

//sending files method

// app.get('/', (req,res) =>{
//     res.sendFile(path.join(__dirname, 'public','index.html'));

// });

// app.get('/about', (req,res) =>{
//     res.sendFile(path.join(__dirname, 'public','about.html'));

// });

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//get all post
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

//get single post
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // res.status(200).json(posts.filter((post) => post.id === id));

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }
  res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ msg: "Please include a title" });
  }

  posts.push(newPost);
  res.status(201).json(newPost);
});

// //update post
// router.put('/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const post = posts.find((post) => post.id === id );

//   if(!post){
//     return res
//     .status(404)
//     .json({msg:`A post with the id of ${id} was not found `});
//   }
//   post.title = req.body.title;
//   res.status(200).json(posts);
// });

export default router;
