export function log (...args) {
  console.log('LOG: ', ...args)
}

async function api (method, path, body) {
  if (process.env.NODE_ENV !== 'production') log(`${method} ${path}`)

  const options = body != null
    ? {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
    : {
      method,
      credentials: 'include'
    }

  const res = await fetch(path, options)

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res
}

export const get = api.papp('GET')
export const post = api.papp('POST')
export const patch = api.papp('PATCH')
export const del = api.papp('DELETE')
