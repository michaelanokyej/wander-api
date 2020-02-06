function makeToursArray() {
  return [
    {
        id: 1,
        name: "TEST TOUR 1",
        city: "WASHINGTON",
        state: "DC",
        img: "https://source.unsplash.com/Oq0KE3CWwdo",
        description: "Test tour by test account",
        max_tourists: 2,
        policies: "Check in is flexible",
        guide_username: "testacc",
        guide_email: "testaccount@user.com",
        guide_id: 1,
    },
    {
        id: 2,
        name: "TEST TOUR 2",
        city: "ROCKVILLE",
        state: "MD",
        img: "https://source.unsplash.com/LGn4x7_RbeU",
        description: "Test tour for test user 1",
        max_tourists: 4,
        policies: "Check in 1 hour before tour starts. ",
        guide_username: "testacc",
        guide_email: "testaccount@user.com",
        guide_id: 1,
    },
    {
        id: 3,
        name: "TEST TOUR 3",
        city: "ROCKVILLE",
        state: "MD",
        img: "https://source.unsplash.com/LGn4x7_RbeU",
        description: "Test tour for test user 1",
        max_tourists: "4",
        policies: "Check in 1 hour before tour starts. ",
        guide_username: "testacc",
        guide_email: "testaccount@user.com",
        guide_id: 1,
    }
]
}

module.exports = {
  makeToursArray
}