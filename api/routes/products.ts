import { Router, Context } from "https://deno.land/x/denotrain/mod.ts";

const productsRouter = new Router();

productsRouter.get("/", async (ctx: Context) => {
  let productsList = await ctx.data.productsCollection.find();
  productsList = productsList.map((p: any) => {
    return {
      ...p,
      Request: {
        method: 'GET',
        url: `http://localhost:3001/products/${p._id.$oid}`
      }
    }    
  });

  return productsList;
});

productsRouter.post("/", async (ctx: Context) => {
  const product_name: string = ctx.req.body.name;
  const price: number = ctx.req.body.price;
  const savedProduct = { product_name, price };
  const insertId = await ctx.data.productsCollection.insertOne(savedProduct);
  return insertId;
});

productsRouter.get("/:productId", async (ctx: Context) => {
  const _id = { $oid: ctx.req.params.productId};
  const product = await ctx.data.productsCollection.findOne({ _id } );
  if (product) {
    return product;
  }
  return { message: 'Not found'};
});

productsRouter.patch("/:productId", async (ctx: Context) => {
  const _id = ctx.req.params.productId;
  const updateProperties = ctx.req.body;

  const { matchedCount, modifiedCount, upsertedId } = await ctx.data.productsCollection.updateOne(
    _id,
    { $set: updateProperties }
  );
  return {
    message: `matchedCount: ${matchedCount}, modifiedCount: ${modifiedCount}, upsertedId: ${upsertedId}`,
  };
});

productsRouter.delete("/:productId", async (ctx: Context) => {
  const _id = ctx.req.params.productId;
  const deleteCount = await ctx.data.productsCollection.deleteOne({ _id });
  return {
    message: `Product ${ctx.req.params.productId} deleted!`,
    items_deleted: deleteCount
  };
});

export { productsRouter };
