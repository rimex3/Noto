import { relations } from "drizzle-orm/relations";
import { users, pages } from "./schema";

export const pagesRelations = relations(pages, ({one}) => ({
	user: one(users, {
		fields: [pages.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	pages: many(pages),
}));