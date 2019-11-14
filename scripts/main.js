window.onload = function () {
    initBuyButtons();
};
/**
 * Wire up all the "Buy" buttons to call buyProduct
 */
function initBuyButtons() {
    var buyBtns = document.querySelectorAll("div.buy");
    for (var i = 0; i < buyBtns.length; i++) {
        var currBtn = buyBtns[i];
        currBtn.onclick = buyProduct;
    }
}
function buyProduct() {
    var prod = getProduct();
    saveProductToCart(prod);
}
function getProduct() {
    var currBuyBtn = this;
    console.log(currBuyBtn);
    //alert("you clicked Buy biotch");
    var currProdDiv = currBuyBtn.parentElement;
    console.log("The parent product div");
    console.log(currProdDiv);
    var prod = new Product();
    prod.title =
        currProdDiv.querySelector("div.title").innerHTML;
    var price = currProdDiv.querySelector("div.price").innerHTML;
    price = price.replace("$", ""); //remove $
    prod.price = parseFloat(price); //needs to be converted to a number
    prod.description = currProdDiv.querySelector("div.description").innerHTML;
    console.log(prod);
    saveProductToCart(prod);
    return prod;
}
function saveProductToCart(p) {
}
/**
 * Represents a single shopping cart item, field
 */
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
// // Test code
// let prod = new Product();
// prod.title = "something";
// prod.description = "something else";
// prod.price = 4.99;
