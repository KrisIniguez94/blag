var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt-as-promised");

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile.js')[environment];
const knex = require('knex')(knexConfig);

/* GET users listing. */
router.get("/", function(req, res, next) {
  knex('users')
  .then(function(users) {
    res.render('users', {
      users
    });
  })
});

//get a single user

router.get('/:id', function(req,res,next) {
  knex('users')
  .where('id', req.params.id)
  .first()
  .then(function(user) {
    knex('posts').orderBy('id').where('user_id', req.params.id)
    .then(function(posts) {
      res.render('user', {user, posts});
    })
  })
})

//Add a post
router.post('/:id', function(req, res, next) {
  const user_id = req.params.id;
  knex('posts')
  .insert({post: req.body.post, user_id: user_id})
  .then(function() {
    res.redirect("/users/" + user_id);
  });
})

// Add a user
router.post('/', function (req, res, next) {
  const {
    username,
    password
  } = req.body;
  bcrypt.hash(password, 12)
    .then(function (hashed_password) {
      return knex('users')
        .insert({
          username,
          hashed_password
        })
    })
    .then(function () {
      res.redirect('/users')
    })
    .catch(function (err) {
      next(err);
    })
})


module.exports = router;
