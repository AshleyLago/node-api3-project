const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

// Calling find returns a promise that resolves to an array of all the resources contained in the database.
function get() {
  return db('posts');
}

// Takes an id as the argument and returns a promise that resolves to the resource with that id if found.
function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

// Calling insert passing it a resource object will add it to the database and return the new resource.
function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

// Accepts two arguments, the first is the id of the resource to update and the second is an object with the 
//  changes to apply. On success it returns the updated record.
function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

// The remove method accepts an id as it's first parameter and, upon successfully deleting the resource from 
//  the database, returns the number of records deleted.
function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
