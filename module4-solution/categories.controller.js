(function () {
    'use strict';

    angular.module('data')
        .controller('CategoryCtrl', CategoryCtrl);

    CategoryCtrl.$inject = ['categories'];
    function CategoryCtrl(categories) {
        var categoriesCtrl = this;
        categoriesCtrl.categories = categories;
        console.log(categories)
    }
})();