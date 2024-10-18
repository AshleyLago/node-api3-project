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
      res.json(users)
    })
    .catch(next)
});


// RETURN THE USER OBJECT
router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

// RETURN THE NEWLY CREATED USER OBJECT
router.post('/', validateUser, (req, res) => {
  
});

// RETURN THE FRESHLY UPDATED USER OBJECT
router.put('/:id', validateUserId, validateUser, (req, res) => {

});

// RETURN THE FRESHLY DELETED USER OBJECT
router.delete('/:id', validateUserId, (req, res) => {

});

// RETURN THE ARRAY OF USER POSTS
router.get('/:id/posts', validateUserId, (req, res) => {

});

// RETURN THE NEWLY CREATED USER POST
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  
});

// Error handling
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message })
})

// do not forget to export the router
module.exports = router