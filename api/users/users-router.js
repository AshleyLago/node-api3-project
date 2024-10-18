const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
});


// RETURN THE USER OBJECT
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

// RETURN THE NEWLY CREATED USER OBJECT
router.post('/', validateUser, (req, res, next) => {
  Users.insert({ name: req.name })
    .then(user => {res.status(201).json(user)})
    .catch(next)
});

// RETURN THE FRESHLY UPDATED USER OBJECT
router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, { name: req.name })
    .then(() => {
      return Users.getById(req.params.id)
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

// RETURN THE FRESHLY DELETED USER OBJECT
router.delete('/:id', validateUserId, async(req, res, next) => {
  try {
    await Users.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

// RETURN THE ARRAY OF USER POSTS
router.get('/:id/posts', validateUserId, async(req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id)
    res.json(posts)
  } catch (err) {
    next(err)
  }
});

// RETURN THE NEWLY CREATED USER POST
router.post('/:id/posts', validateUserId, validatePost, async(req, res, next) => {
  try {
    const posts = await Posts.insert({ user_id: req.params.id, text: req.text })
    res.status(201).json(posts)
  } catch (err) {
    next(err)
  }
});

// Error handling
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message })
})

// do not forget to export the router
module.exports = router