// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import JQuery from 'jquery';

Rails.start()
Turbolinks.start()
ActiveStorage.start()

//= require jquery-3.2.1.slim.min
//= require popper.min
//= require bootstrap.min


require("jquery")
require("jquery-datetimepicker")
// require ("bootstrap-datepicker")
// require ("bootstrap-datepicker/locales/bootstrap-datepicker.en-GB.js")

// window.jQuery = $;
// window.$ = $;
require("bootstrap")
import "../stylesheets/application";
document.addEventListener("turbolinks:load", function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()
    })
})



window.jQuery = $;
window.$ = $;

