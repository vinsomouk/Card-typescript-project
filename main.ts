
// Définition de l'interface Storable
// Cette interface définit les méthodes pour stocker et charger des données
interface Storable {
    save(data: any): void;
    load(): any;
  }
  
  // Définition de la classe InMemoryStorage
  // Cette classe implémente l'interface Storable et définit les méthodes pour stocker et charger des données en mémoire
  class InMemoryStorage implements Storable {
    // Tableau pour stocker les données
    private data: any[] = [];
  
    // Méthode pour stocker des données
    save(data: any): void {
      this.data = data;
    }
  
    // Méthode pour charger des données
    load(): any {
      return this.data;
    }
  }
  
  // Définition de la classe Product
  // Cette classe représente un produit avec un nom et un prix
  class Product {
    constructor(public name: string, public price: number) {}
  }
  
  // Définition de la classe Cart
  // Cette classe dépend d'un stockage via l'interface Storable
  class Cart {
    private storage: Storable;
    private products: Product[] = [];
  
    // Constructeur pour initialiser le stockage
    constructor(storage: Storable) {
      this.storage = storage;
    }
  
    // Méthode pour ajouter un produit au panier
    addProduct(product: Product): void {
      this.products.push(product);
      this.storage.save(this.products);
    }
  
    // Méthode pour supprimer un produit du panier
    removeProduct(product: Product): void {
      const index = this.products.indexOf(product);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
      this.storage.save(this.products);
    }
  
    // Méthode pour récupérer les produits du panier
    getProducts(): Product[] {
      return this.products;
    }
  
    // Méthode pour calculer le total des articles dans le panier
    getTotal(): number {
      return this.products.reduce((total, product) => total + product.price, 0);
    }
  }
  
  // Création d'un stockage en mémoire
  const storage = new InMemoryStorage();
  // Création d'un panier avec le stockage
  const cart = new Cart(storage);
  
  // Création de produits
  const product1 = new Product('Produit 1', 10.99);
  const product2 = new Product('Produit 2', 5.99);
  
  // Ajout des produits au panier
  cart.addProduct(product1);
  cart.addProduct(product2);
  
  // Affichage des produits du panier
  console.log(cart.getProducts());
  
  // Affichage du total des articles dans le panier
  console.log(cart.getTotal());