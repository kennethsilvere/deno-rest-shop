import { Application, Context } from "https://deno.land/x/denotrain/mod.ts";
import { productsRouter } from "./api/routes/products.ts";
import { ordersRouter } from "./api/routes/orders.ts";

// Initialize deno train app on port 3001
const app = new Application({ port: 3001 });

// Enable cors
app.use((ctx: Context) => {
    ctx.res.addHeader('Access-Control-Allow-Origin', '*');
    ctx.res.addHeader('Access-Control-Allow-Headers', '*');
    if (ctx.req.original.method == 'OPTIONS') {
        ctx.res.addHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return {};
    }
});

// Products and orders api handled by their own routers
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


// Error handling
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

// Run app
await app.run();
