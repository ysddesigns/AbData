import client from "./mongodb";

export const createUser = async (user: any) => {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.insertOne(user);
    console.log("User created:", result);
  } catch (error) {
    console.log(error);
  }
};

export const readUser = async (id: any) => {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: id });
    console.log("user read:", result);
  } catch (error) {
    console.log("readUser...:", error);
  }
};

export const updateUser = async (id: any, user) => {
  try {
    const db = client.db();
    const collection = db.collection("users");
    const result = await collection.updateOne({ _id: id }, { $set: user });
    console.log("user updated", result);
  } catch (error) {
    console.log("error updating user:", error);
  }
};

export const deleteUser = async (id: any) => {
  const db = client.db();
  const collection = db.collection("users");
  const result = await collection.deleteOne({ _id: id });
  try {
  } catch (error) {
    console.log("error deleting user:", error);
  }
};
