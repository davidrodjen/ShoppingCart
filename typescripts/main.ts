window.onload = function(){
    initBuyButtons();
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
    
    let prod = getProduct();

    saveProductToCart(prod);

    }
    
function getProduct() {

    let currBuyBtn = <HTMLElement>this;
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
    saveProductToCart(prod);
    return prod;
}

    function saveProductToCart(p:Product):Product[]{

    }

    

}