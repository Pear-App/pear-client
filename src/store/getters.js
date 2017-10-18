export default {
  me: state => state.users[state.meId],
  singles: state => state.singlesId.map(_ => state.users[_.id]),
  friends: state => state.friendsId.map(_ => state.users[_.id])
}
