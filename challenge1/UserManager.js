class User {
    constructor(name, photo, email) {
      this.id = null;
      this.name = name;
      this.photo = photo;
      this.email = email;
    }
  }
  
  class UserManager {
    constructor() {
      this.users = [];
    }
  
    create(data) {
      const newUser = new User(
        data.name,
        data.photo,
        data.email,
      );
      const newId = this.users.length + 1;
      newUser.id = newId;
      this.users.push(newUser);
    }
  
    read() {
      return this.users;
    }
  
    readOne(id) {
      const result = this.users.find((user) => user.id === id);
      return result || null;
    }
  }
  
  // Testing
  const myManager = new UserManager();
  
  myManager.create({
    name: "Valentina Tarapow",
    photo: "photoRoute1.jpg",
    email: "tarapow.v@gmail.com",
  });

  myManager.create({
    name: "Juan Node",
    photo: "photoRoute2.jpg",
    email: "juan@node.com",
  });

  const allUsers = myManager.read();
  console.log("Read all users: ");
  allUsers.forEach((user) => {
    console.log(JSON.stringify(user, null, 2));
  });
  
  const idToFind = 1;
  const foundUser = myManager.readOne(idToFind);
  foundUser
    ? console.log(`User found with ID ${idToFind}:\n`, JSON.stringify(foundUser, null, 2))
    : console.log(`There is no user with ID ${idToFind}`);