import { column, Schema, Table } from '@powersync/web';
import { PowerSyncDatabase } from '@powersync/web';
import { Connector } from './connector';

const lists = new Table({
  created_at: column.text,
  name: column.text,
  owner_id: column.text
});

const todos = new Table(
  {
    list_id: column.text,
    created_at: column.text,
    completed_at: column.text,
    description: column.text,
    created_by: column.text,
    completed_by: column.text,
    completed: column.integer
  },
  { indexes: { list: ['list_id'] } }
);

export const AppSchema = new Schema({
  todos,
  lists
});

export type Database = (typeof AppSchema)['types'];

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'powersync.db'
    // Optional. Directory where the database file is located.'
    // dbLocation: 'path/to/directory'
  }
});

export const setupPowerSync = async () => {
  // Uses the backend connector that will be created in the next section
  const connector = new Connector();
  db.connect(connector);
};
