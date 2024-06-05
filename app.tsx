import { Hono } from "hono";
import { streamText } from "hono/streaming";
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod'
import bookRouter from "./routes/books.ts";
import Top from './page.tsx'

const app = new Hono();

app.use('*', logger())

app.get("/hello", (c) => {
    return c.json({ hello: "world" })
})

app.route("/books", bookRouter);

app.post(
    '/posts',
    zValidator(
        'json',
        z.object({
            title: z.string(),
            body: z.string(),
        }),
        // (result, c) => {
        //     if (!result.success) {
        //         return c.json(result.error, 400)
        //     }
        // }
    ),
    (c) => {
        return c.json({ hello: 'world' })
    }
)

app.get('/stream', (c) => {
    return streamText(c, async (stream) => {
        for (let i = 0; i < 10; i++) {
            await stream.writeln(`Hello ${i}`);
            await stream.sleep(1000);
        }
    })
})

app.get('/', (c) => {
    const message = ['Good Morning', 'Good Afternoon', 'Good Evening'];
    return c.html(<Top messages={message} />)
})

export default app;