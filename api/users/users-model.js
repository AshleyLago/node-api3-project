const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
};

// Calling find returns a promise that resolves to an array of all the resources contained in the database.
function get() {
  return db('users');
}

// Takes an id as the argument and returns a promise that resolves to the resource with that id if found.
function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

// When passed a user's id, this returns a list of all the posts for the user.
function getUserPosts(userId) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
}

// Calling insert passing it a resource object will add it to the database and return the new resource.
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

// Accepts two arguments, the first is the id of the resource to update and the second is an object with the 
//  changes to apply. On success it returns the updated record.
function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(rows => {
      return getById(id);
    });
}

// The remove method accepts an id as it's first parameter and, upon successfully deleting the resource from 
//  the database, returns the number of records deleted.
function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
