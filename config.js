const path = require('path')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const tail = env === 'development' ? '' : `.${process.env.NODE_ENV}`

const envSetup = dotenv.config({
  path: path.join(__dirname, `./.env${tail}`)
})

if (envSetup.error) {
  throw envSetup.error
}

const {
  HOST,
  PORT,
  MXIMGPATH,
  MXCNFPATH,
  API_SERVER_URL,
  API_SERVER_PORT
} = process.env

module.exports = {
  HOST,
  PORT,
  MXIMGPATH,
  MXCNFPATH,
  API_SERVER_URL,
  API_SERVER_PORT
}
