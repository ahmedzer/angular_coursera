angular.module("ShoppingListCheckOff",[])
.controller("ToBuyController",ToBuyController)
.controller("AlreadyBoughtController",AlreadyBoughtController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService)

ToBuyController.$inject = ["ShoppingListCheckOffService"]
AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCrtl = this;
    toBuyCrtl.toBuyItems = ShoppingListCheckOffService.toBuyItems

    toBuyCrtl.buyItem = function (idx) {
        try {
            ShoppingListCheckOffService.buyItem(idx)
        }
        catch (e) {
            this.errorMessage = e.message
        }
    }
}

function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBuyCrtl = this;
    alreadyBuyCrtl.alreadyBoughtItems = ShoppingListCheckOffService.alreadyBoughtItems
}

function ShoppingListCheckOffService() {
    var service = this;
    service.toBuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "water", quantity: 8 },
        { name: "sugar", quantity: 2 },
        { name: "oil", quantity: 3 },
        { name: "milk", quantity: 3 },
        { name: "donuts", quantity: 5 },
        { name: "cookies", quantity: 5 }
    ]

    service.alreadyBoughtItems = []

    service.buyItem = function (idx) {
        if (this.toBuyItems.length > 0) {
            item = this.toBuyItems[idx]//retrieve selected item to add it to alreadyBoughtItems
            this.toBuyItems.splice(idx, 1)//remove the item with index idx
            this.alreadyBoughtItems.push(item)
        }
        else {
            throw new Error("Everything is bought!")
        }
    }


}

