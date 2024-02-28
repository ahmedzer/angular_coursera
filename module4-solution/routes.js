(function () {
    'use strict';
    angular.module("MenuApp")
        .config(RoutesConfig)

    RoutesConfig.$inject = ["$stateProvider","$urlRouterProvider"]

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/")
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "home.template.html"
            })
            .state("categories", {
                url: "/categories",
                templateUrl: "categories.template.html",
                controller: "CategoryCtrl as categoriesCtrl",
                resolve: {
                    categories: ["MenuDataService", function (MenuDataService) {
                        console.log("ahmed")
                        return MenuDataService.getAllCategories()
                    }]
                }
            })
            .state("items", {
                url: "/items/:categoryShortName",
                templateUrl: "item.template.html",
                controller: "ItemsController as itemsCtrl",
                resolve: {
                    items: ["MenuDataService", "$stateParams", function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                    }]
                }
            })

    }
})()