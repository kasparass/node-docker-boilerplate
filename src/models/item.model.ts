let db = { query: (a, b, c) => Promise.resolve() };

const loadDb = (providedDb) => {
  db = providedDb;
  return db;
};

const itemModel = {
  createTable: async () =>
    new Promise((resolve, reject) => {
      db.query(
        `CREATE TABLE IF NOT EXISTS items (
          id          serial          PRIMARY KEY,
          name        varchar(255),
          completed   boolean
        );`,
        [],
        (err: Error, res) => {
          if (err) return reject(err);
          return resolve(res);
        }
      );
    }),

  getItem: async (id) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM items WHERE id = $1", [id], (err, res) => {
        if (err) return reject(err);
        return resolve(
          res.rows.map((item: any) => ({
            ...item,
            completed: item.completed === 1,
          }))[0]
        );
      });
    }),

  getItems: async () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM items", [], (err, res) => {
        if (err) return reject(err);
        return resolve(
          res.rows.map((item) => ({ ...item, completed: item.completed === 1 }))
        );
      });
    }),

  storeItem: async (item) =>
    new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO items (name, completed) VALUES ($1, $2) RETURNING *",
        [item.name, item.completed ? 1 : 0],
        (err, res) => {
          if (err) return reject(err);
          return resolve(res.rows[0]);
        }
      );
    }),

  updateItem: async (id, item) =>
    new Promise((resolve, reject) => {
      db.query(
        "UPDATE items SET name = $1, completed = $2 WHERE id = $3 RETURNING *",
        [item.name, item.completed ? 1 : 0, id],
        (err, res) => {
          if (err) return reject(err);
          return resolve(res.rows[0]);
        }
      );
    }),

  removeItem: async (id) =>
    new Promise((resolve, reject) => {
      db.query("DELETE FROM items WHERE id = $1", [id], (err, res) => {
        if (err) return reject(err);
        return resolve(res.rows);
      });
    }),
};

export { itemModel, loadDb };
