const authService = {
  getAllUsers(knex) {
    return knex.select('*').from('users')
       },
  insertUser(knex, newUser) {
    return knex
    .insert(newUser)
    .into('users')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
  },
  getById(knex, id) {
     return knex.from('users').select('*').where('id', id).first()
   },
   getByGuideUsername(knex, GuideUsername) {
    return knex.from('users').select('*').where('email', GuideUsername).first()
  },
  deleteUser(knex, id) {
     return knex('users')
      .where({ id })
      .delete()
  },
  updateUser(knex, id, newUserFields) {
    return knex('users')
     .where({ id })
     .update(newUserFields)
  }
}

module.exports = userservice
