import { Router, Context } from "https://deno.land/x/denotrain/mod.ts";

const ordersRouter = new Router();

ordersRouter.get("/", async (ctx: Context) => {
  const orders = await ctx.data.ordersCollection.find();
  return { message: "Orders fetched", orders };
});

ordersRouter.post("/", async (ctx: Context) => {
  const productId = ctx.req.body.productId;
  const quantity = ctx.req.body.quantity;
  const order = { productId, quantity };
  const insertId = await ctx.data.ordersCollection.insertOne(order);
  return { message: "Orders posted!", insertId };
});

ordersRouter.get("/:orderId", async (ctx: Context) => {
  const _id = ctx.req.params.orderId;
  const order = await ctx.data.ordersCollection.findOne({ _id });
  if (order) {
    return {
      message: `Fetched order wth order ID: ${ctx.req.params.orderId}`,
      order,
    };
  }
  return { message: "Not found" };
});

ordersRouter.post("/:orderId", (ctx: Context) => {
    return { message: `Post order with order ID: ${ ctx.req.params.orderId }` };
})

ordersRouter.delete("/:orderId", async (ctx: Context) => {
    const _id = ctx.req.params.orderId;
    const deleteCount = await ctx.data.ordersCollection.deleteOne({ _id });
    return {
      message: `Order ${ _id } deleted!`,
      items_deleted: deleteCount
    };
});

export { ordersRouter };