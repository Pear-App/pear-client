import { initialUser } from '../util'

export default {
  isLoggedIn: null,
  jwt: null,

  // Map of ID -> User (me, friend, single)
  users: {
    new: initialUser('new'),
  },

  // My profile
  me: null,

  // IDs of people trying to match you up
  friends: [],

  // IDs of people you are trying to match up
  singles: [],

  // List of pending/rejected invitations
  invitations: [],
}
