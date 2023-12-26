const fs = require("fs");

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
    this.filePath = './data/products.json';
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        throw error;
      }
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.filePath, data, 'utf-8');
  }

  create(data) {
    if (!data.title || !data.photo || !data.price || !data.stock) {
      console.log("All the fields are mandatory");
      return;
    }

    const newProduct = new Product(
      data.title,
      data.photo,
      data.price,
      data.stock
    );

    newProduct.id = this.products.length + 1;
    this.products.push(newProduct);

    this.saveProducts();
  }

  read() {
    return this.loadProducts();
  }

  readOne(id) {
    return this.loadProducts().find((product) => product.id === id) || null;
  }
}

if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data', { recursive: true });
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
console.log("Read all products in file: ");
allProducts.forEach((product) => {
  console.log(JSON.stringify(product, null, 2));
});

const idToFind = 1;
const foundProduct = myManager.readOne(idToFind);
foundProduct
  ? console.log(`Product find with ID ${idToFind}:\n`, JSON.stringify(foundProduct, null, 2))
  : console.log(`There is no product with ID ${idToFind}`);
