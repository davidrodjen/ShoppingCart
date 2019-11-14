window.onload = function () {
    initBuyButtons();
    //display the number at the start
    displayNumberOfItems();
    var cartIcon = document.querySelector("#shopping-cart");
    cartIcon.onclick = showCartContents;
};
function showCartContents() {
    var displayDiv = document.querySelector("#display-cart");
    displayDiv.innerHTML = ""; //this makes it so multiple clicks of the shopping cart does not repeatedly add the cart
    var allProds = ProductStorage.getAllProducts();
    //programatically create a structure for each product that makes it able to be manipulated by CSS
    for (var i = 0; i < allProds.length; i++) {
        var prod = allProds[i];
        /*((recreate this with the for loop programmatically))
            <div class="display-product">
                <h2>Widget - $80.00</h2>
                <p>Widgets are really cool</p>
            </div>
        */
        var prodDiv = document.createElement("div");
        prodDiv.classList.add("display-product");
        var h2 = document.createElement("h2");
        h2.innerHTML = prod.title + " - $" + prod.price;
        //h2.innerHTML = `${prod.title} - $${prod.price}`; Another way of doing it, template literal
        prodDiv.appendChild(h2);
        displayDiv.appendChild(prodDiv);
    }
}
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
    var currBtn = this; // The "Buy" button that was clicked
    var prod = getProduct(currBtn);
    saveProductToCart(prod);
    displayNumberOfItems();
}
function displayNumberOfItems() {
    //get number of items in storage
    var numItems = ProductStorage.getNumberOfProducts();
    //display it in the span
    var cartSpan = document.querySelector("div#shopping-cart > span");
    cartSpan.innerHTML = numItems.toString(); //have to put .toString() because of datatype issues
}
function getProduct(currBuyBtn) {
    console.log("The buy button that was clicked");
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
    return prod;
}
function saveProductToCart(p) {
    ProductStorage.addProduct(p);
    return ProductStorage.getAllProducts();
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
var ProductStorage = /** @class */ (function () {
    function ProductStorage() {
    }
    // Add Product. p as parameter as a Product, Product is the class object we created in the Product TS
    ProductStorage.addProduct = function (p) {
        // get existing products
        var prods = ProductStorage.getAllProducts();
        prods.push(p);
        var data = JSON.stringify(prods); //Convert our whole program array to JSON
        localStorage.setItem("prods", data); //puts it back into local storage
    };
    /**
     * Returns all products or an empty
     * array if no products are stored
     */
    ProductStorage.getAllProducts = function () {
        var data = localStorage.getItem("prods");
        if (data == null) {
            return new Array(); //return array of type product which is the class that we created in the Typescript
        }
        return JSON.parse(data); //put the cast of <Product[]> to make sure it casts at the right item
    };
    // Get number of Products
    ProductStorage.getNumberOfProducts = function () {
        var prods = ProductStorage.getAllProducts();
        return prods.length;
    };
    return ProductStorage;
}());
