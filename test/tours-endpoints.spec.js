require('dotenv').config()
const app = require('../src/app')
const knex = require('knex')
const { makeToursArray } = require('./tours-fixtures')

describe(`Users Endpoints`, function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE users, guides, tours, bookings  RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE users, guides, tours, bookings RESTART IDENTITY CASCADE'))

    describe('GET /api/tours', () => {
        context(`Given no tours`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/tours')
                    .expect(200, [])
            })
        })

        context(`Given there are tours in the database`, () => {
            const testTours = makeToursArray()

            beforeEach(() => {
                return db
                    .into('tours')
                    .insert(testTours)
            })

            // it(`GET /api/tours responds with 200 and all of the tours`, () => {
            //     return supertest(app)
            //         .get('/api/tours')
            //         .expect(200)
            // })
        })
    })

    describe('GET /api/tours/:tour_id', () => {

        context(`Given no tours`, () => {
            it(`Responds with 404`, () => {
                const tourId = 123456
                return supertest(app)
                    .get(`/api/tours/${tourId}`)
                    .expect(404);
            })
        })

        context(`Given there are tours in the database`, () => {
            const testTours = makeToursArray()

            beforeEach(() => {
                return db
                    .into('tours')
                    .insert(testTours)
            })

            // it(`responds with 200 and the specified folder`, () => {
            //     const tourId = 3
            //     const expectedTour = testTours[tourId - 1]

            //     return supertest(app)
            //         .get(`/api/tours/${tourId}`)
            //         .expect(200, expectedTour)
            // })
        })
    })

    describe('POST /api/tours', () => {
        // it(`creates a tour, responding with 201 and the new tour`, () => {
        //     const newTour = {
        //       name: "TEST TOUR 1",
        //       city: "WASHINGTON",
        //       state: "DC",
        //       img: "https://source.unsplash.com/Oq0KE3CWwdo",
        //       description: "Test tour by test account",
        //       max_tourists: 2,
        //       policies: "Check in is flexible"
        //     }
        //     return supertest(app)
        //         .post('/api/tours')
        //         .send(newTour)
        //         .expect(201)
        //         .expect(res => {
        //             expect(res.body.name).to.eql(newTour.name)
        //             expect(res.body).to.have.property('id')
        //         })
        //         .then(res =>
        //             supertest(app)
        //                 .get(`/api/users/${res.body.id}`)
        //                 .expect(res.body)
        //         )
        // })

        it(`responds with 400 and an error message when the 'name' is missing`, () => {
            return supertest(app)
                .post('/api/tours')
                .send({
                  city: "WASHINGTON",
                  state: "DC",
                  img: "https://source.unsplash.com/Oq0KE3CWwdo",
                  description: "Test tour by test account",
                  max_tourists: 2,
                  policies: "Check in is flexible"
                })
                .expect(400, {
                    error: { message: "'name' is required" }
                })
        })
    })
})