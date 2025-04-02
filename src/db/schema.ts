import { pgTable, uuid, varchar, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const pageTypeEnum = pgEnum("page_type", ["empty", "tasks"]);

export const usersTable = pgTable("users", {
    auth_id: varchar("auth_id", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    avatar_url: varchar("avatar_url", { length: 500 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const pagesTable = pgTable("pages", {
    id: uuid("id").primaryKey().defaultRandom(),
    auth_id: varchar("auth_id", { length: 255 }).notNull().references(() => usersTable.auth_id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    type: pageTypeEnum("type").notNull().default("empty"),
    content: jsonb("content"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});