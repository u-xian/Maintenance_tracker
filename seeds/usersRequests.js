var bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync('test', 8);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstname: 'Sinmi', lastname: 'John',email:'sinmiloluwasunday@yahoo.com',password:hashedPassword,role:'admin'},
      ]);
    });
};
