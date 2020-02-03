function makeUsersArray() {
  return [
    {
        id: 1,
        username: "michaelanokyej",
        f_name: "Michael",
        l_name: "Anokye",
        email: "michaelanokyej@yahoo.com",
        password: "wanderpassword123"
    },
    {
        id: 2,
        username: "testuser2",
        f_name: "test",
        l_name: "user2",
        email: "test2@user.com",
        password: "testpass"
    },
    {
        id: 3,
        username: "test3user",
        f_name: "test3",
        l_name: "user",
        email: "test3@user.com",
        password: "testpass"
    }
  ]
}

module.exports = {
  makeUsersArray
}