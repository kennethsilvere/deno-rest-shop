import { Application, Context } from "https://deno.land/x/denotrain/mod.ts";
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

import { productsRouter } from "./api/routes/products.ts";
import { ordersRouter } from "./api/routes/orders.ts";





await init();
const client = new MongoClient();
client.connectWithUri("mongodb+srv://ken:MongoKen2603@cluster0-pxzgs.mongodb.net/test?retryWrites=true&w=majority");
const db = client.database("rest-shop");
const productsCollection = db.collection("products");
const ordersCollection = db.collection("orders");

// Initialize deno train app on port 3001
const app = new Application({ port: 3001 });

// Connect to MongoDB
// await init();
// const client = new MongoClient();
// client.connectWithUri("mongodb://ken:MongoKen2603@cluster0-pxzgs.mongodb.net/test?retryWrites=true&w=majority");
// export { client };

// Connect to mariadb on aws
// const maria = await new Client().connect({
//     hostname: "rest-shop.c3jzbwbbysx6.us-east-1.rds.amazonaws.com",
//     username: "root",
//     db: "rest-shop",
//     password: "",
//   });

//   await maria.execute(`DROP TABLE IF EXISTS users`);

//   await maria.execute(`
//   CREATE TABLE products (
//       productsId int(11) varchar(100) NOT NULL,
//       name varchar(100) NOT NULL,
//       created_at timestamp not null default current_timestamp,
//       PRIMARY KEY (productsId)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
// `);

// Enable cors
app.use((ctx: Context) => {
    ctx.res.addHeader('Access-Control-Allow-Origin', '*');
    ctx.res.addHeader('Access-Control-Allow-Headers', '*');
    ctx.data.productsCollection = productsCollection;
    ctx.data.ordersCollection = ordersCollection;
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
