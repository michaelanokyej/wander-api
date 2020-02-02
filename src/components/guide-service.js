const guideService = {
  getAllGuides(knex) {
    return knex.select("*").from("Guides");
  },
  insertGuide(knex, newGuide) {
    return knex
      .insert(newGuide)
      .into("guides")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("guides")
      .select("*")
      .where("id", id)
      .first();
  },
  getByUserName(knex, guidename) {
    return knex
      .from("guides")
      .select("*")
      .where("username", guidename)
      .first();
  },
  getByGuideEmail(knex, guideEmail) {
    return knex
      .from("guides")
      .select("*")
      .where("email", guideEmail)
      .first();
  },
  deleteGuide(knex, id) {
    return knex("guides")
      .where({ id })
      .delete();
  },
  updateGuide(knex, id, newGuideFields) {
    return knex("guides")
      .where({ id })
      .update(newGuideFields);
  }
};

module.exports = guideService;
