(function () {
    'use strict';
    angular.module("data").component('items', {
        templateUrl: "item.template.html",
        bindings: {
            items: "<"
        },
        controller:ItemsController,
    })

    function ItemsController() {
        var $ctrl = this;

        // Initialize any variables
        $ctrl.$onInit = function() {
            console.log("init")
        };
    }
})()