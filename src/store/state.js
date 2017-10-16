export default {
  // Facebook login status
  isLoggedIn: null,
  userID: null,

  findingFor: 0, // 0: friend, 1: me

  // List of people to swipe
  persons: {
    queue: [],
    rejected: [],
    accepted: []
  },

  // Friend's profile
  friend: {
    lookingFor: 0, // 0: female, 1: male, 2: either
    ageRange: {
      min: 18,
      max: 80
    },
    name: '',
    interests: [
      { name: 'Art', active: false },
      { name: 'Books', active: false },
      { name: 'Dance', active: false },
      { name: 'Movies', active: false },
      { name: 'Music', active: false },
      { name: 'Sports', active: false },
      { name: 'TV Shows', active: false },
      { name: 'Video Games', active: false }
    ]
  }
}
