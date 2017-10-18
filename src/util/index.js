import { API_URL } from '../constants'
import store from '../store'

async function api (method, path, body) {
  if (process.env.NODE_ENV !== 'production') log(`${method} ${path}`)

  const options = body != null
    ? {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.state.jwt}`
      },
      body: JSON.stringify(body)
    }
    : {
      method,
      headers: {
        'Authorization': `Bearer ${store.state.jwt}`
      }
    }

  const res = await fetch(`${API_URL}${path}`, options)

  if (!res.ok) {
    throw new Error(res.statusText)
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

export function log (...args) {
  console.log('LOG: ', ...args)
}

export function promisify (fn) {
  return new Promise((resolve, reject) => {
    fn(resolve, (...args) => reject(new Error(...args)))
  })
}
