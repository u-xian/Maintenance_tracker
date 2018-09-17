
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(function () {
      // Inserts seed entries
      return knex('requests').insert([
        {title: 'Damaged Chair', description: 'we have a fault',category:'electrical',image:'',status:'approved',dated:'2018-12-13',userid:2},
        {title: 'Faulty AC', description: 'we have a fault',category:'electrical',image:'',status:'approved',dated:'2018-12-13',userid:2},,
        {title: 'Machine Fault', description: 'we have a fault',category:'electrical',image:'',status:'disapproved',dated:'2018-12-13',userid:2},
        {title: 'Electronic Fault', description: 'we have a fault',category:'electrical',image:'',status:'disapproved',dated:'2018-12-13',userid:2},
        {title: 'Damaged door', description: 'we have a fault',category:'electrical',image:'',status:'resolved',dated:'2018-12-13',userid:2},
        {title: 'Broken Window', description: 'we have a fault',category:'electrical',image:'',status:'resolved',dated:'2018-12-13',userid:2},
      ]);
    });
};
