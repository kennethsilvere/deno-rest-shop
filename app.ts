import { Application } from "https://deno.land/x/denotrain/mod.ts";
import { productsRouter } from "./api/routes/products.ts";
import { ordersRouter } from "./api/routes/orders.ts";

const app = new Application({ port: 3001 });

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

await app.run();
