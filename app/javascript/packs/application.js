// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// global.toastr = require("toastr")
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import JQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
import "../stylesheets/application";
// import "../stylesheets/application.scss";
// require("stylesheets/application.scss")


Rails.start()
Turbolinks.start()
ActiveStorage.start()

//= require jquery-3.2.1.slim.min
//= require popper.min
//= require bootstrap.min

import toastr from "toastr";


require("jquery")
require("jquery-datetimepicker")

require("bootstrap")

document.addEventListener("turbolinks:load", function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()
    })
})

// import './src/application.scss'

// import toastr from 'toastr'
window.toastr = toastr



window.jQuery = $;
window.$ = $;

