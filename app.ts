import { Application } from "https://deno.land/x/denotrain/mod.ts";

const app = new Application({port: 3001});

app.use((ctx: any) => {
    // Returning a json
    return {"hello": "world"};
});

await app.run();
