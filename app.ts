import { Application, Context } from "https://deno.land/x/denotrain/mod.ts";
import { productsRouter } from "./api/routes/products.ts";
import { ordersRouter } from "./api/routes/orders.ts";

const app = new Application({ port: 3001 });

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((ctx: Context) => {
    const error = new Error('Not found');
    ctx.data = error;
})

app.use((ctx: Context) => {
    const err = ctx.data;
    return {
        error: {
            message: err.message
        }
    }
});

await app.run();
