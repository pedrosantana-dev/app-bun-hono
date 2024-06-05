import { Hono } from "hono";

const book = new Hono();

book.get("/", (c) => c.text('List Books'))
book.get("/:id", (c) => {
    const id = c.req.param('id')
    return c.text('Get Book ' + id)
})
book.post("/", (c) => c.text('Create Book'))

export default book;