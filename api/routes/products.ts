import { Router, Context } from "https://deno.land/x/denotrain/mod.ts";

const productsRouter = new Router();

productsRouter.get("/", (ctx: Context) => {
  return {
    hello: "products",
    method: "get",
  };
});

productsRouter.post("/", (ctx: Context) => {
  const name = ctx.req.body.name;
  const price = ctx.req.body.price;
  const savedProduct = { name, price };
  return {
    hello: "products",
    method: "post",
    savedProduct,
  };
});

productsRouter.get("/:productId", (ctx: Context) => {
  const id = ctx.req.params.productId;
  if (id === "special") {
    return {
      message: "You discovered the special ID.",
    };
  } else {
    return {
      message: "Product ID received",
      id,
    };
  }
});

productsRouter.patch("/:productId", (ctx: Context) => {
  return {
    message: `Product ${ctx.req.params.productId} updated!`,
  };
});

productsRouter.delete("/:productId", (ctx: Context) => {
  return {
    message: `Product ${ctx.req.params.productId} deleted!`,
  };
});

export { productsRouter };
