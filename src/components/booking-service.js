const bookingService = {
  getAllBookings(knex) {
    return knex.select("*").from("bookings");
  },
  insertBooking(knex, newBooking) {
    return knex
      .insert(newBooking)
      .into("bookings")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getByUsername(knex, GuideUsername) {
    return knex
      .from("users")
      .select("*")
      .where("username", GuideUsername)
      .first();
  },
  getById(knex, id) {
    return knex
      .from("bookings")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteBooking(knex, id) {
    return knex("bookings")
      .where({ id })
      .delete();
  },
  updateBooking(knex, id, newBookingFields) {
    return knex("bookings")
      .where({ id })
      .update(newBookingFields);
  }
};

module.exports = bookingService;
