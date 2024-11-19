import { serve } from "@hono/node-server"
import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.post("/upload", async (c) => {
  const body = await c.req.parseBody()
  console.log(body["file"])
})

const port = 3333
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
