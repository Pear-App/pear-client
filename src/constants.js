export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://pear-server.tk/api'
    : 'http://localhost:3000/api'

export const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://pear-server.tk/'
    : 'http://localhost:3000/'
