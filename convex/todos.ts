import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { status_validator, day_validator } from "./schema";

//
// GET
//
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dnd_todos").collect();
  },
});

export const getByStatus = query({
  args: {
    status: status_validator,
  },
  handler: async (ctx, args) => {
    const dnd_todos_by_status = await ctx.db
      .query("dnd_todos")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();

    return dnd_todos_by_status;
  },
});

export const getByDueDay = query({
  args: {
    dueDay: day_validator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("dnd_todos")
      .withIndex("by_dueDay", (q) => q.eq("dueDay", args.dueDay))
      .collect();
  },
});

//
// POST (i.e. insert)
//
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

//
// PATCH or PUT
//
export const updateStatus = mutation({
  args: { id: v.id("dnd_todos"), status: status_validator },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      updatedTime: Date.now(),
    });
  },
});

export const updateCompleted = mutation({
  args: { id: v.id("dnd_todos"), completed: v.boolean() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      completed: args.completed,
      updatedTime: Date.now(),
    });
  },
});

export const updateTitle = mutation({
  args: { id: v.id("dnd_todos"), title: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      title: args.title,
      updatedTime: Date.now(),
    });
  },
});

//
// DELETE
//
export const remove = mutation({
  args: { id: v.id("dnd_todos") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
