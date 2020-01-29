const tourService = {
  getAllTours(knex) {
    return knex.select('*').from('tours')
       },
  insertTour(knex, newTour) {
    return knex
    .insert(newTour)
    .into('tours')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
  },
  getByGuideUsername(knex, GuideUsername) {
    return knex.from('users').select('*').where('email', GuideUsername).first()
  },
  getById(knex, id) {
     return knex.from('tours').select('*').where('id', id).first()
   },
  getBySearchTerm(knex, city, state) {
    return knex.from('tours').select('*').where('city','ilike', `%${city}%`).andWhere('state','ilike', `%${state}%`)
  } ,
  deleteTour(knex, id) {
     return knex('tours')
      .where({ id })
      .delete()
  },
  updateTour(knex, id, newTourFields) {
    return knex('tours')
     .where({ id })
     .update(newTourFields)
  }
}

module.exports = tourService
