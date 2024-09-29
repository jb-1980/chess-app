import "dotenv/config"
import { createServer } from "node:http"
import { handleUpgrade } from "./server/websocket"
import { setupExpress } from "./server/setup-express"

const app = setupExpress()
const server = createServer(app)

server.on("upgrade", handleUpgrade)

const PORT = Number(process.env.PORT) || 5000
server.listen(PORT, "0.0.0.0", () => {
  console.info(`server running at http://0.0.0.0:${PORT}`)
})
