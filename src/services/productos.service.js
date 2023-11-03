import db from "../config/db.js";

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "select * from productos where ID_Product = ? and state_delete = 'N'";
    db.execute(query, [id])
      .then((res) => resolve(res[0]))
      .catch((err) => reject(err));
  });
};

export const getProductos = (pagina) => {
  return new Promise((resolve, reject) => {
    const query = "select * from productos where state_delete = 'N' order by Price desc limit ?,5";
    db.execute(query, [pagina])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createProduct = (newProduct) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      Prod_Name,
      Price,
      Width,
      Height,
      Colour,
      Images,
      state_delete,
      Delete_at,
      Created_at,
      Update_at,
    } = newProduct;
    const query =
      "insert into productos (ID_Product, Prod_Name, Price, Width, Height, Colour, Images, state_delete, Delete_at, Created_at, Update_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.execute(query, [
      id,
      Prod_Name,
      Price,
      Width,
      Height,
      Colour,
      Images,
      state_delete,
      Delete_at,
      Created_at,
      Update_at,
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProduct = (newProduct, id) => {
  return new Promise((resolve, reject) => {
    const {
      Prod_Name,
      Price,
      Width,
      Height,
      Colour,
      Images,
      state_delete,
      Delete_at,
      Created_at,
      Update_at,
    } = newProduct;
    const query =
      "update productos set ID_Product = ?, Prod_Name = ?, Price = ?, Width = ?, Height = ?, Colour = ?, Images = ?, state_delete = ?, Delete_at = ?, Created_at = ?, Update_at = ? where ID_Product = ?";
    db.execute(query, [
      id,
      Prod_Name,
      Price,
      Width,
      Height,
      Colour,
      Images,
      state_delete,
      Delete_at,
      Created_at,
      Update_at,
      id,
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query = "delete from productos where ID_Product = ?";
    db.execute(query, [id])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
