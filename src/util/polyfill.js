/* eslint-disable no-extend-native */
Function.prototype.papp = function(...args) {
  var fn = this
  return function(...moreArgs) {
    return fn.apply(this, [...args, ...moreArgs])
  }
}
