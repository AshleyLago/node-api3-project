const User = require('../users/users-model')
const Posts = require('../posts/posts-model')

// * Logger logs to the console the following information about each request: request method, request url, and a timestamp
// * This middleware runs on every request made to the API
function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.url}`)
  next()
}


// * This middleware will be used for all user endpoints that include an id parameter in the url (ex: /api/users/:id and it 
//    should check the database to make sure there is a user with that id.
// * If the id parameter is valid, store the user object as req.user and allow the request to continue
// * If the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }
async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      next({ status: 404, message: "user not found"})
    }
  } catch (err) {
    next(err)
  }
}


// * ValidateUser validates the body on a request to create or update a user
// * If the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || !name.trim()) {
    next({ status:400, message: "missing required name field" })
  } else {
    req.name = name.trim()
  }
}


// * ValidatePost validates the body on a request to create a new post
// * If the request body lacks the required text field, respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    next({ status:400, message: "missing required text field" })
  } else {
    req.text = text.trim()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}