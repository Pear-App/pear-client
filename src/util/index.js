import { API_URL } from '../constants'
import store from '../store'

async function api(method, path, body) {
  if (process.env.NODE_ENV !== 'production') log(`${method} ${path}`)

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${store.state.jwt}`,
    },
  }

  if (body != null) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  }

  const res = await fetch(`${API_URL}${path}`, options)

  if (!res.ok) {
    switch (res.status) {
      case 401:
        store.dispatch('notLoggedIn')
        break
      case 500:
        console.log(res)
        break
      default:
        throw new Error(res.statusText)
    }
  }

  return res.json()
}

if (process.env.NODE_ENV !== 'production') {
  global.api = api
}

export const get = api.papp('GET')
export const post = api.papp('POST')
export const patch = api.papp('PATCH')
export const del = api.papp('DELETE')

export function log(...args) {
  console.log('LOG: ', ...args)
}

export function promisify(fn) {
  return new Promise((resolve, reject) => {
    fn(resolve, (...args) => reject(new Error(...args)))
  })
}

export function initialUser(id) {
  return {
    id,
    isSingle: true,
    nickname: '',
    sex: 'M',
    sexualOrientation: 'F',
    age: 18,
    minAge: 18,
    maxAge: 80,
    desc: '',
    interests: '',
    facebookName: '',
    facebookId: '',
    facebookToken: '',
    createdAt: '',
    updatedAt: '',
  }
}
