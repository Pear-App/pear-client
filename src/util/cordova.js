import router from '../router'

function getFcmToken() {
  window.FCMPlugin.getToken(function(token) {
    if (token === null) {
      setTimeout(getFcmToken, 1000)
    } else {
      localStorage.setItem('fcmToken', token)
    }
  })
}

document.addEventListener('deviceready', () => {
  // Facebook
  if (typeof facebookConnectPlugin !== 'undefined') {
    global.FB = window.facebookConnectPlugin
    global.FB.login = global.FB.login.papp(['public_profile', 'user_photos'])
  }

  // Push Notifications
  if (typeof FCMPlugin !== 'undefined') {
    setTimeout(getFcmToken, 1000)

    window.FCMPlugin.onNotification(function(data) {
      if (data.wasTapped) {
        // app on background and push notification tapped
        router.push(data.route)
      } else {
        // app on foreground, trigger local push notification
        if (cordova.platformId === 'android') {
          cordova.plugins.notification.local.schedule({
            title: data.title,
            text: data.text,
            foreground: true,
            data: { route: data.route },
          })
        }
      }
    })
  }

  cordova.plugins.notification.local.on('click', function(notification) {
    // app on foreground and push notification tapped
    router.push(notification.data.route)
  })

  // Universal Links
  /* global universalLinks */
  universalLinks.subscribe(null, data => {
    router.push(data.path)
  })

  // Statusbar Color
  /* global StatusBar */
  if (cordova.platformId === 'android') {
    StatusBar.backgroundColorByHexString('#e4ce82')
  } else {
    StatusBar.backgroundColorByHexString('#fee591')
  }
})
