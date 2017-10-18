export default {
  isLoggedIn: null,
  jwt: null,

  // Map of ID -> User (me, friend, single)
  users: {},

  // My profile
  me: null,

  // {
  //   id: null,
  //   isSingle: true,
  //   nickname: '',
  //   sex: 'M',
  //   sexualOrientation: 'F',
  //   minAge: 18,
  //   maxAge: 80,
  //   desc: '',
  //   facebookName: '',
  //   facebookId: '',
  //   facebookToken: '',
  //   createdAt: '',
  //   updatedAt: ''
  // },

  // IDs of people trying to match you up
  friends: [],

  // IDs of people you are trying to match up
  singles: [],

  // List of people to swipe
  persons: []

}
