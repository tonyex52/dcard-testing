const host = process.env.host || 'localhost'
const port = parseInt(process.env.PORT, 10) || 3000

module.exports = {
  host,
  port,
}
