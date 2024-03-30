import Dexie, { Table } from "dexie";
import { LoadoutConfig } from "@/lib/settings";

export class MyDatabase extends Dexie {
  config!: Table<LoadoutConfig, number>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      config: "++id, lastUsed",
    });
  }
}

export const db = new MyDatabase();
