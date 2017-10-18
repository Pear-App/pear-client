export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://pear.c0t5zumpiujt.ap-southeast-1.rds.amazonaws.com/api'
  : 'http://localhost:3000/api'
