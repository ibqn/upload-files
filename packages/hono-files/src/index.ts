import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { Readable } from "stream"
import { createReadStream, existsSync } from "fs"
import path from "path"
import { prettyJSON } from "hono/pretty-json"
import { cors } from "hono/cors"

const app = new Hono()

app.use(prettyJSON())

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404))
app.use("/api/*", cors())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.get("/file/:name", (c) => {
  const { name } = c.req.param()
  // const filePath = path.join("file-storage", "nasa-rTZW4f02zY8-unsplash.jpg")
  const filePath = path.join("file-storage", name)
  if (!existsSync(filePath)) {
    return c.json({ message: "File not found", ok: false }, 404)
  }
  const nodeStream = createReadStream(filePath)
  const stream = Readable.toWeb(nodeStream) as ReadableStream

  c.header("Content-Type", "image/jpeg")
  return c.body(stream)
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
