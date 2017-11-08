import { initialUser } from '../util'

export default function() {
  return {
    isLoggedIn: null,
    hasSeenTutorial: false,
    jwt: null,

    // Map of ID -> User (me, friend, single)
    users: {
      new: initialUser('new'),
    },

    // My profile
    me: null,
    photos: [],

    // IDs of people trying to match you up
    friends: [],

    // IDs of people you are trying to match up
    singles: [],

    // List of pending/rejected invitations
    invitations: [],

    // Map of hash -> User for invitations
    invitationHashes: {},

    // List of rooms you are in
    rooms: [],

    // Map of room -> List of messages in that room
    roomMessages: {},

    // List of blocked user ids
    blockedIds: [],

    // Boolean of whether to show footer
    showFooter: true,
  }
}
