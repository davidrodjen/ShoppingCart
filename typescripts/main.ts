window.onload = function(){
    initBuyButtons();
    //display the number at the start
    displayNumberOfItems();

    let cartIcon = <HTMLElement>document.querySelector("#shopping-cart");
    cartIcon.onclick = showCartContents;
}

function showCartContents(){
    let displayDiv = document.querySelector("#display-cart");

    displayDiv.innerHTML = ""; //this makes it so multiple clicks of the shopping cart does not repeatedly add the cart

    let allProds = ProductStorage.getAllProducts();
    //programatically create a structure for each product that makes it able to be manipulated by CSS

    for(let i = 0; i < allProds.length; i++){
        const prod = allProds[i];
        /*((recreate this with the for loop programmatically))
            <div class="display-product">
                <h2>Widget - $80.00</h2>
                <p>Widgets are really cool</p>
            </div>
        */

       let prodDiv = document.createElement("div");
       prodDiv.classList.add("display-product");

       let h2 = document.createElement("h2");
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
    let buyBtns = document.querySelectorAll("div.buy");
    for (let i = 0; i < buyBtns.length; i++) {
        let currBtn = <HTMLElement>buyBtns[i];
        currBtn.onclick = buyProduct;
    }
}

function buyProduct(){
    let currBtn = this; // The "Buy" button that was clicked
    let prod = getProduct(currBtn);

    saveProductToCart(prod);

    displayNumberOfItems();
}

function displayNumberOfItems(){
    //get number of items in storage
    let numItems = ProductStorage.getNumberOfProducts();
    //display it in the span
    let cartSpan = document.querySelector("div#shopping-cart > span");
    cartSpan.innerHTML = numItems.toString(); //have to put .toString() because of datatype issues
}
    
function getProduct(currBuyBtn:HTMLElement) {
    console.log("The buy button that was clicked");
    console.log(currBuyBtn);
    //alert("you clicked Buy biotch");

    let currProdDiv = currBuyBtn.parentElement;
    console.log("The parent product div");
    console.log(currProdDiv);

    let prod = new Product();
    prod.title =
        currProdDiv.querySelector("div.title").innerHTML;
    let price = currProdDiv.querySelector("div.price").innerHTML;
    price = price.replace("$", ""); //remove $
    prod.price = parseFloat(price); //needs to be converted to a number

    prod.description = currProdDiv.querySelector("div.description").innerHTML;
    
    console.log(prod);
    return prod;
}

function saveProductToCart(p:Product):Product[]{
    ProductStorage.addProduct(p);
    return ProductStorage.getAllProducts();
}