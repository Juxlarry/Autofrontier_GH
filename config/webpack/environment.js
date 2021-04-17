const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.prepend(
    'Provide',
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      datetimepicker: 'jquery-datetimepicker',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      moment: ['moment/moment', 'default']
    })
)

module.exports = environment
