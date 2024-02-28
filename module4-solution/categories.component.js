(function () {
    'use strict';

    angular.module("data")
        .component('categories', {
            templateUrl: "categories.template.html",
            bindings: {
                categories: "<"
            },
        });

})();