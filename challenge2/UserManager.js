const fs = require("fs");

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
    this.filePath = './data/users.json';
    this.users = this.loadUsers();
  }

  loadUsers() {
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

  saveUsers() {
    const data = JSON.stringify(this.users, null, 2);
    fs.writeFileSync(this.filePath, data, 'utf-8');
  }

  create(data) {
    if (!data.name || !data.photo || !data.email) {
      console.log("All the fields are mandatory");
      return;
    }

    const newUser = new User(
      data.name,
      data.photo,
      data.email,
    );

    newUser.id = this.users.length + 1;
    this.users.push(newUser);

    this.saveUsers();
  }

  read() {
    return this.loadUsers();
  }

  readOne(id) {
    return this.loadUsers().find((user) => user.id === id) || null;
  }
}

if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data', { recursive: true });
}

// Testing User Manager
const userManager = new UserManager();

userManager.create({
  name: "Valentina Tarapow",
  photo: "photoRoute1.jpg",
  email: "tarapow.v@gmail.com",
});

userManager.create({
  name: "Juan Node",
  photo: "photoRoute2.jpg",
  email: "juan@node.com",
});

const allUsers = userManager.read();
console.log("Read all users from file: ");
allUsers.forEach((user) => {
  console.log(JSON.stringify(user, null, 2));
});

const idToFindUser = 1;
const foundUser = userManager.readOne(idToFindUser);
foundUser
  ? console.log(`User found with ID ${idToFindUser}:\n`, JSON.stringify(foundUser, null, 2))
  : console.log(`There is no user with ID ${idToFindUser}`);
