import Dexie, { Table } from "dexie";
import { Config } from "@/lib/config";

export class MyDatabase extends Dexie {
  config!: Table<Config, number>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      config: "++id, lastUsed, role",
    });
  }
}

export const db = new MyDatabase();
