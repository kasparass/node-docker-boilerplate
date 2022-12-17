import waitPort from "wait-port";
import { Pool, QueryResult } from "pg";
import {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} from "../config/config";
import { itemModel, loadDb } from "../models/item.model";

class Postgres {
  pool: Pool;

  static instance: Postgres;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  static async init() {
    const host = POSTGRES_HOST;
    const user = POSTGRES_USER;
    const password = POSTGRES_PASSWORD;
    const database = POSTGRES_DB;
    const port = parseInt(POSTGRES_PORT, 10);

    await waitPort({ host, port });
    const pool = new Pool({
      host,
      user,
      password,
      database,
      port,
    });
    const postgres = new Postgres(pool);
    Postgres.instance = postgres;
    await postgres.createTables();

    return postgres;
  }

  async createTables() {
    loadDb(this);
    await itemModel.createTable();
  }

  async teardown() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async query(
    text: string,
    params: any,
    callback: (err: Error, result: QueryResult<any>) => void
  ) {
    return this.pool.query(text, params, callback);
  }
}

export default Postgres;
