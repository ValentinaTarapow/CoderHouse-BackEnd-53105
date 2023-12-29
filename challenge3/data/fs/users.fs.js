import fs from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";
import crypto from "node:crypto";

class UserManager {
  static #path = "./data/fs/files/users.json";

  constructor() {
    this.init();
  }

  init() {
    if (!existsSync(UserManager.#path)) {
      const data = JSON.stringify([], null, 2);

      writeFileSync(UserManager.#path, data);
    }
  }

  async create(data) {
    const propsList = ["name", "photo", "email"];
    const keyList = Object.keys(data);

    const missingProps = [];

    for (let i = 0; i < propsList.length; i++) {
      !keyList.includes(propsList[i]) ? missingProps.push(propsList[i]) : null;
    }

    if (missingProps.length) {
      console.log(`Please complete the following fields as they are all required: \n${missingProps.join(`\n`)}`);
    } else {
      const users = await this.readFile();
      const { name, photo, email } = data;

      users.push({
        id: crypto.randomBytes(12).toString("hex"),
        name,
        photo,
        email,
      });

      try {
        await fs.writeFile(UserManager.#path, JSON.stringify(users, null, 2));

        return users[users.length - 1];
      } catch (e) {
        throw e.message;
      }
    }
  }

  async readFile() {
    try {
      const users = JSON.parse(
        await fs.readFile(UserManager.#path, {
          encoding: "utf-8",
        })
      );

      return users;
    } catch (e) {
      throw e.message;
    }
  }

  async readOne(id) {
    try {
      const users = await this.readFile();

      return users.find((el) => el.id == id) ?? [];
    } catch (e) {
      throw e.message;
    }
  }

  async destroy(id) {
    try {
      const users = await this.readFile();
      const newList = users.filter((el) => el.id !== id);

      if (users.length == newList.length) return false;

      await fs.writeFile(UserManager.#path, JSON.stringify(newList, null, 2));

      return true;
    } catch (error) {
      throw e.error;
    }
  }
}

const UsersManager = new UserManager();

export default UsersManager;