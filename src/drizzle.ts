import { wrapPowerSyncWithDrizzle } from "@powersync/drizzle-driver";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { db } from "./schema";

// Define Drizzle schema
const lists = sqliteTable("lists", {
  id: text("id"),
  name: text("name"),
});

const todos = sqliteTable("todos", {
  id: text("id"),
  description: text("description"),
  list_id: text("list_id"),
  created_at: text("created_at"),
});


const listsRelations = relations(lists, ({ many }) => ({
  todos: many(todos),
}));

const todosRelations = relations(todos, ({ one }) => ({
  list: one(lists, {
    fields: [todos.list_id],
    references: [lists.id],
  }),
}));

export const drizzleSchema = {
  lists,
  todos,
  listsRelations,
  todosRelations,
};


// Wrap the database with Drizzle
// Provide the Drizzle schema you created above
export const dbDrizzle = wrapPowerSyncWithDrizzle(db, {
  schema: drizzleSchema,
});

