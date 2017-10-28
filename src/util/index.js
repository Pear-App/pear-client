import { Toast } from 'quasar'

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

  let res
  try {
    res = await fetch(`${API_URL}${path}`, options)
  } catch (e) {
    return [null, e]
  }

  if (!res.ok) {
    switch (res.status) {
      case 401:
        store.commit('logout')
        break
      case 404:
      case 500:
        const data = await res.json()
        const err = data.message || 'Unable to connect'
        Toast.create.negative({
          html: err,
        })
        return [null, err]
      default:
        throw new Error(res.statusText)
    }
  }

  return [await res.json(), null]
}

if (process.env.NODE_ENV !== 'production') {
  global.api = api
}

export const get = api.papp('GET')
export const post = api.papp('POST')
export const patch = api.papp('PATCH')
export const del = api.papp('DELETE')

export function log(...args) {
  if (process.env.NODE_ENV === 'production') return
  console.log('LOG: ', ...args)
}

export function promisify(fn, ...fnArgs) {
  return new Promise((resolve, reject) => {
    fn(resolve, ...fnArgs, (...args) => reject(new Error(...args)))
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

export function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min)
}

export function normalise(x, min, max) {
  return clamp(x, min, max) / (max - min)
}
