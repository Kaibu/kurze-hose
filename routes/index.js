var express = require('express')
var request = require('request')
var config = require('../config.js')
var router = express.Router()

/* GET main page. */
router.get('/', function (req, res, next) {
  request({
      method: 'GET',
      uri: config.weather_api_url
    },
    function (error, response, body) {
      if (error) {
        res.render('error', {error: error})
      }

      var parsed = JSON.parse(body);

      if(parsed.main.temp_min < config.resistance.cold) {
        res.render('no', {title: 'Kurze Hose ?', temp: parsed.main.temp_min, resistance: config.resistance})
      } else {
        res.render('yes', {title: 'Kurze Hose ?', temp: parsed.main.temp_min, resistance: config.resistance})
      }
    })
})

module.exports = router
