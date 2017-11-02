import router from '../router'

document.addEventListener('deviceready', () => {
  // Facebook
  if (typeof facebookConnectPlugin !== 'undefined') {
    global.FB = window.facebookConnectPlugin
    global.FB.login = global.FB.login.papp(['public_profile', 'user_photos'])
  }

  // Push Notifications
  if (typeof FCMPlugin !== 'undefined') {
    window.FCMPlugin.getToken(function(token) {
      global.fcmToken = token
    })

    window.FCMPlugin.onNotification(function(data) {
      if (data.wasTapped) {
        // app on background and push notification tapped
        router.push(data.route)
      } else {
        // app on foreground, trigger local push notification
        cordova.plugins.notification.local.schedule({
          title: data.title,
          text: data.text,
          foreground: true,
          data: { route: data.route },
        })
      }
    })
  }

  cordova.plugins.notification.local.on('click', function(notification) {
    // app on foreground and push notification tapped
    router.push(notification.data.route)
  })

  // Universal Links
  /* global universalLinks */
  universalLinks.subscribe('launchFromLink', data =>
    console.log('Did launch application from the link: ' + data.url)
  )
})
