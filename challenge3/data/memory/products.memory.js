class productManager {
  static #products = [];

  id;
  name;
  photo;
  email;

  create(data) {
    const propsList = ["title", "photo", "price", "stock"];
    const keyList = Object.keys(data);

    const missingProps = [];

    for (let i = 0; i < propsList.length; i++) {
      !propsList.includes(keyList[i]) ? missingProps.push(propsList[i]) : null;
    }

    if (missingProps.length) {
      console.log(`Please complete the following fields as they are all required: \n${missingProps.join(`\n`)}`);
    } else {
      const id = productManager.#products[productManager.#products.length - 1]?.id + 1 || 1;

      productManager.#products.push({ id, ...data });
    }
  }

  read() {
    return productManager.#products;
  }

  readOne(id) {
    return productManager.#products.find((el) => el.id == id);
  }
}

const ProductManager = new productManager();

ProductManager.create({
  title: "Product 1",
  photo: "photoRoute1.jpg",
  price: 10,
  stock: 100,
});
ProductManager.create({
  title: "Product 2",
  photo: "photoRoute2.jpg",
  price: 20,
  stock: 200,
});
console.log(ProductManager.read());
console.log(ProductManager.readOne(2));

ProductManager.create({
  title: "Product name",
  photo: "photoRoute.jpg",
  price: 20,
  stock: 200,
});