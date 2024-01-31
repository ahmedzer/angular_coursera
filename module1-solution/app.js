angular.module("LunchCheck",[])
    .controller('LunchCheckController',LunchCheckController);
LunchCheckController.$inject = ["$scope"];

function LunchCheckController($scope){
    $scope.lunchMenu = ""
    $scope.message = ""

    $scope.checkLunch = function (){
        var menu_items = $scope.lunchMenu.split(",")
        menu_items = menu_items.filter(function(menu_item) {
            return menu_item.trim() !== "";
        });

        if (menu_items.length === 0){
            $scope.message = "Please enter data first"
        }
        else if (menu_items.length <= 3) {
            $scope.message = "Enjoy!"
        }
        else {
            $scope.message = "Too much!"
        }
    }
    $scope.checkColor = function () {
        if ($scope.message === "Enjoy!" || $scope.message === "Too much!" ){
            return 'green-text'
        }
        else {
            return 'red-text'
        }
    }
    $scope.checkBorder = function () {
        if ($scope.message === "Enjoy!" || $scope.message === "Too much!" ){
            return 'green-border'
        }
        else if ($scope.message === "Please enter data first"){
            return 'red-border'
        }
    }
}