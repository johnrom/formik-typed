'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./formik-typed.cjs.production.js');
} else {
  module.exports = require('./formik-typed.cjs.development.js');
}
