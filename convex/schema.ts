import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const status_validator = v.union(
  v.literal("TODO"),
  v.literal("IN_PROGRESS"),
  v.literal("DONE"),
  v.literal("BACKLOG")
);

export const day_validator = v.union(
  v.literal("Monday"),
  v.literal("Tuesday"),
  v.literal("Wednesday"),
  v.literal("Thursday"),
  v.literal("Friday"),
  v.literal("Saturday"),
  v.literal("Sunday")
);

export default defineSchema({
  dnd_todos: defineTable({
    title: v.string(),
    status: status_validator,
    dueDay: day_validator,
    completed: v.boolean(),
    updatedTime: v.number(),
    user: v.optional(v.id("users")),
  })
    .index("by_dueDay", ["dueDay"])
    .index("by_status", ["status"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
