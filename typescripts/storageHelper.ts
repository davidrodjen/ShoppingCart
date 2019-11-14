
class ProductStorage{
    // Add Product. p as parameter as a Product, Product is the class object we created in the Product TS
    static addProduct(p:Product):void{
        // get existing products
        let prods = ProductStorage.getAllProducts();
        prods.push(p);

        let data = JSON.stringify(prods); //Convert our whole program array to JSON
        localStorage.setItem("prods", data);  //puts it back into local storage
    }

    /**
     * Returns all products or an empty
     * array if no products are stored
     */
    static getAllProducts():Product[]{
        let data = localStorage.getItem("prods");

        if(data == null){
            return new Array<Product>(); //return array of type product which is the class that we created in the Typescript
        }

        return <Product[]>JSON.parse(data); //put the cast of <Product[]> to make sure it casts at the right item
    }
    // Get number of Products

    static getNumberOfProducts(){
        let prods = ProductStorage.getAllProducts();
        return prods.length;
    }
}