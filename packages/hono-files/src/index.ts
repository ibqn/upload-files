import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { Readable } from "stream"
import { createReadStream } from "fs"
import { access, writeFile } from "fs/promises"
import path from "path"
import { prettyJSON } from "hono/pretty-json"
import { cors } from "hono/cors"
import mime from "mime"

const app = new Hono()

app.use(prettyJSON())

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404))
app.use("/api/*", cors())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.get("/file/:name", async (c) => {
  const { name } = c.req.param()
  const filePath = path.join("file-storage", name)

  try {
    await access(filePath)
  } catch (error) {
    return c.json({ message: "File not found", ok: false }, 404)
  }

  const readStream = createReadStream(filePath)
  const stream = Readable.toWeb(readStream) as ReadableStream

  const contentType = mime.getType(name)

  if (!contentType) {
    return c.json({ message: "Content-Type not found", ok: false }, 500)
  }

  c.header("Content-Type", contentType)
  return c.body(stream)
})

app.post("/upload", async (c) => {
  const body = await c.req.parseBody()
  const file = body["file"]

  // await new Promise((resolve) => setTimeout(resolve, 3000))

  if (!(file instanceof File)) {
    return c.json({ message: "File not found", ok: false }, 404)
  }

  const filePath = path.join("file-storage", file.name)
  const buffer = await file.arrayBuffer()
  await writeFile(filePath, Buffer.from(buffer))

  console.log("File uploaded", file.name)

  return c.json({ message: "File uploaded", fileName: file.name, ok: true })
})

const port = 3333
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
