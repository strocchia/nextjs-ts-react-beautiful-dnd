import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { status_validator, day_validator } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dnd_todos").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    status: status_validator,
    dueDay: day_validator,
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("dnd_todos", {
      title: args.title,
      status: args.status,
      dueDay: args.dueDay,
      completed: args.completed,
      updatedTime: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("dnd_todos"), status: status_validator },
  handler: async (ctx, args) => {
    console.log(args);
    return await ctx.db.patch(args.id, {
      status: args.status,
      updatedTime: Date.now(),
    });
  },
});
