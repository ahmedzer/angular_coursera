(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDownCtrl = this;
        narrowItDownCtrl.searchTerm = "";
        narrowItDownCtrl.found = [];
        narrowItDownCtrl.message = "";

        narrowItDownCtrl.search = function () {
            if (narrowItDownCtrl.searchTerm.trim() === "") {
                narrowItDownCtrl.found = [];
                narrowItDownCtrl.message = "Nothing found"
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm);

                promise.then(function (foundItems) {
                    narrowItDownCtrl.found = foundItems;
                    if (narrowItDownCtrl.found.length === 0 ) {
                        narrowItDownCtrl.message = "Nothing found"
                    }
                    else {
                        narrowItDownCtrl.message = ""
                    }
                })
                    .catch(function (error) {
                        console.log("Error fetching menu items:", error);
                    });
            }

        };

        narrowItDownCtrl.removeItem = function (index) {
            narrowItDownCtrl.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: ApiBasePath
            }).then(function (response) {

                var foundItems = [];

                // Loop through each category
                for (var categoryKey in response.data) {
                    var category = response.data[categoryKey];

                    // Loop through menu items in the category
                    for (var i = 0; i < category.menu_items.length; i++) {
                        var menuItem = category.menu_items[i];

                        // Check if the description contains the search term
                        if (menuItem.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            foundItems.push(menuItem);
                        }
                    }
                }

                return foundItems;
            })
                .catch(function (error) {
                    console.log("Error fetching menu items:", error);
                    return [];
                });
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                foundItem: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
    }

})();
