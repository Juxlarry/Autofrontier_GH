// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// global.toastr = require("toastr")
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
import "../stylesheets/application";
import toastr from "toastr";
import "@fortawesome/fontawesome-free/scss/regular.scss"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "../stylesheets/application.scss";
// require("stylesheets/application.scss")


Rails.start()
Turbolinks.start()
ActiveStorage.start()


//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require popper.min

//= require daterangepicker
 



// require("jquery-datetimepicker")

// require("@fortawesome/fontawesome-free");



document.addEventListener("turbolinks:load", function() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()
    })
})


window.toastr = toastr


// window.jQuery = $;
// window.$ = $;

