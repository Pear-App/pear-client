export default {
  isLoggedIn: null,
  jwt: null,

  // My profile
  me: {
    id: null,
    isSingle: true,
    nickname: '',
    sex: 'M',
    sexualOrientation: 'F',
    ageRange: { min: 18, max: 80 },
    desc: '',
    facebookName: '',
    facebookId: '',
    facebookToken: '',
    createdAt: '',
    updatedAt: ''
  },

  // People trying to match you up
  friends: [],

  // People you are trying to match up
  singles: [],

  // Friend's profile
  friend: {
    id: null,
    isSingle: true,
    nickname: '',
    sex: 'M',
    sexualOrientation: 'F',
    ageRange: { min: 18, max: 80 },
    desc: '',
    facebookName: '',
    facebookId: '',
    facebookToken: '',
    createdAt: '',
    updatedAt: '',
    friend: [] // { id: Number, facebookName: String }
  },

  // List of people to swipe
  persons: []

}
