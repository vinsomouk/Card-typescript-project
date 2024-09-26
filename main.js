var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
var Cart = /** @class */ (function () {
    function Cart() {
        this.products = [];
    }
    Cart.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    Cart.prototype.removeProduct = function (product) {
        var index = this.products.indexOf(product);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    };
    Cart.prototype.getProducts = function () {
        return this.products;
    };
    return Cart;
}());
var LocalStorageArray = /** @class */ (function () {
    function LocalStorageArray() {
        this.storage = localStorage;
    }
    LocalStorageArray.prototype.save = function (data) {
        this.storage.setItem('cart', JSON.stringify(data));
    };
    LocalStorageArray.prototype.load = function () {
        var data = this.storage.getItem('cart');
        return data ? JSON.parse(data) : [];
    };
    return LocalStorageArray;
}());
var CartService = /** @class */ (function () {
    function CartService(cart, storage) {
        this.cart = cart;
        this.storage = storage;
    }
    CartService.prototype.addProduct = function (product) {
        this.cart.addProduct(product);
        this.storage.save(this.cart.getProducts());
    };
    CartService.prototype.removeProduct = function (product) {
        this.cart.removeProduct(product);
        this.storage.save(this.cart.getProducts());
    };
    CartService.prototype.getProducts = function () {
        return this.cart.getProducts();
    };
    return CartService;
}());
var cart = new Cart();
var storage = new LocalStorageArray();
var cartService = new CartService(cart, storage);
var product = new Product('Produit 1', 10.99);
cartService.addProduct(product);
console.log(cartService.getProducts());
