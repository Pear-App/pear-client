import router from '../router'
import { post } from './'
import { Toast } from 'quasar'

function tryGetToken(maxRetry) {
  window.FCMPlugin.getToken(function(token) {
    if (token !== null) {
      localStorage.setItem('fcmToken', token)
      post('/user/fcmToken', { fcmToken: token })
    } else if (maxRetry > 0) {
      setTimeout(tryGetToken(maxRetry - 1), 1000)
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
    const fcmToken = localStorage.getItem('fcmToken')
    if (fcmToken == null || fcmToken === 'null') {
      tryGetToken(10)
    }

    window.FCMPlugin.onTokenRefresh(function(token) {
      if (token !== null) {
        localStorage.setItem('fcmToken', token)
        post('/user/fcmToken', { fcmToken: token })
      }
    })

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
        } else {
          var text = data.text
          Toast.create({
            html: text.length > 50 ? text.slice(0, 50) + '...' : text,
            timeout: 3000,
            color: 'black',
            bgColor: 'white',
            button: {
              label: 'Go',
              handler() {
                router.push(data.route)
              },
            },
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
    router.push(data.hash)
  })

  // Statusbar Color
  /* global StatusBar */
  if (cordova.platformId === 'android') {
    StatusBar.backgroundColorByHexString('#e4ce82')
  } else {
    StatusBar.backgroundColorByHexString('#fee591')
  }
})
