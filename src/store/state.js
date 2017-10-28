import { initialUser } from '../util'

export default {
  isLoggedIn: null,
  hasSeenTutorial: false,
  jwt: null,

  // Map of ID -> User (me, friend, single)
  users: {
    new: initialUser('new'),
  },

  // My profile
  me: null,
  isMatchmakerMode: true,

  // IDs of people trying to match you up
  friends: [],

  // IDs of people you are trying to match up
  singles: [],

  // List of pending/rejected invitations
  invitations: [],

  // Map of hash -> User for invitations
  invitationHashes: {},
}
