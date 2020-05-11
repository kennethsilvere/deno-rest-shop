import { Router, Context } from "https://deno.land/x/denotrain/mod.ts";

const ordersRouter = new Router();

ordersRouter.get("/", (ctx: Context) => {
    return { message: "Orders fetched" };
});

ordersRouter.post("/", (ctx: Context) => {
  const productId = ctx.req.body.productId;
  const quantity = ctx.req.body.quantity;
  const order = { productId, quantity };
  return { message: "Orders posted!", order };
});

ordersRouter.get("/:orderId", (ctx: Context) => {
    return { message: `Fetched order wth order ID: ${ ctx.req.params.orderId }` };
})

ordersRouter.post("/:orderId", (ctx: Context) => {
    return { message: `Post order with order ID: ${ ctx.req.params.orderId }` };
})

ordersRouter.delete("/:orderId", (ctx: Context) => {
    return { message: `Delete order - ${ ctx.req.params.orderId }` };
});

export { ordersRouter };