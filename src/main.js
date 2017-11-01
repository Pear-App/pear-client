// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import 'whatwg-fetch'

import './util/polyfill'
import './util/facebookSdk'
import './util/cordova'
import { SOCKET_URL } from './constants'

import Vue from 'vue'
import Quasar, {
  Toast,
  QBtn,
  QCard,
  QCardActions,
  QCardMain,
  QCardMedia,
  QCardSeparator,
  QCardTitle,
  QCarousel,
  QChatMessage,
  QField,
  QIcon,
  QInput,
  QItem,
  QItemMain,
  QItemSide,
  QItemTile,
  QLayout,
  QList,
  QListHeader,
  QPopover,
  QRange,
  QRouteTab,
  QScrollArea,
  QTabs,
  QToolbar,
  QToolbarTitle,
} from 'quasar'
import VueChatScroll from 'vue-chat-scroll'
import VueSocketio from 'vue-socket.io'
import escapeHtml from 'escape-html'
import router from './router'
import store from './store'

Vue.prototype.$escapeHtml = escapeHtml
Vue.config.productionTip = false
Vue.use(Quasar, {
  components: {
    Toast,
    QBtn,
    QCard,
    QCardActions,
    QCardMain,
    QCardMedia,
    QCardSeparator,
    QCardTitle,
    QCarousel,
    QChatMessage,
    QField,
    QIcon,
    QInput,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QLayout,
    QList,
    QListHeader,
    QPopover,
    QRange,
    QRouteTab,
    QScrollArea,
    QTabs,
    QToolbar,
    QToolbarTitle,
  },
})
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueChatScroll)
Vue.use(VueSocketio, SOCKET_URL)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default),
  })
})
