// import router from '../router'

document.addEventListener('deviceready', () => {
  // Facebook
  if (typeof facebookConnectPlugin !== 'undefined') {
    global.FB = window.facebookConnectPlugin
    global.FB.login = global.FB.login.papp(['public_profile', 'user_photos'])
  }

  // Universal Links
  /* global universalLinks */
  universalLinks.subscribe('launchFromLink', data =>
    console.log('Did launch application from the link: ' + data.url)
  )

  // Statusbar Color
  /* global StatusBar */
  if (cordova.platformId === 'android') {
    StatusBar.backgroundColorByHexString('#e4ce82')
  } else {
    StatusBar.backgroundColorByHexString('#fee591')
  }
})
