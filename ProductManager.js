class Product {
  constructor(title, photo, price, stock) {
    this.id = null;
    this.title = title;
    this.photo = photo;
    this.price = price;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  create(data) {
    const newProduct = new Product(
      data.title,
      data.photo,
      data.price,
      data.stock
    );
    const newId = this.products.length + 1;
    newProduct.id = newId;
    this.products.push(newProduct);
  }

  read() {
    return this.products;
  }

  readOne(id) {
    const result = this.products.find((product) => product.id === id);
    return result || null;
  }
}

// Testing
const myManager = new ProductManager();

myManager.create({
  title: "Product 1",
  photo: "photoRoute1.jpg",
  price: 10,
  stock: 100,
});
myManager.create({
  title: "Product 2",
  photo: "photoRoute2.jpg",
  price: 20,
  stock: 200,
});

const allProducts = myManager.read();
console.log("Read all products: ");
allProducts.forEach((product) => {
  console.log(JSON.stringify(product, null, 2));
});

const idToFind = 1;
const foundProduct = myManager.readOne(idToFind);
foundProduct
  ? console.log(`Product found with ID ${idToFind}:\n`, JSON.stringify(foundProduct, null, 2))
  : console.log(`There is no product with ID ${idToFind}`);