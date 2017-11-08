var stats = require('./stats')

module.exports = function(pathname) {
  var names = Object.keys(stats.images)

  names.forEach(function(name) {
    stats.images[name] = pathname + stats.images[name]
  })

  return stats
}
