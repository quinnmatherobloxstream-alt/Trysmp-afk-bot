const mc = require("minecraft-protocol");

const SERVER_IP = "trysmp.net";
const SERVER_PORT = 19132;
const USERNAME = "quinnaufcola";
const ECONOMY_CMD = "/queue economy";

// Create the Bedrock client
const client = mc.createClient({
  host: SERVER_IP,
  port: SERVER_PORT,
  username: USERNAME,
  version: "bedrock_1.19.80", // generic supported 1.19+ protocol version
  offline: true
});

client.on("connect", () => {
  console.log("✅ Connected to TrySMP (Bedrock)");
  
  // Send economy command once joined
  client.write("chat", { message: ECONOMY_CMD });
  console.log("💬 Sent", ECONOMY_CMD);

  // Anti‑AFK movement: tiny input every 30s
  setInterval(() => {
    client.write("move_player_pos", {
      x: 0, y: 0, z: 0, // no real movement
      on_ground: true
    });
    console.log("🌀 Anti‑AFK tick");
  }, 30000);
});

client.on("error", (err) => {
  console.log("⚠️ Protocol error:", err);
});

client.on("end", () => {
  console.log("❌ Disconnected, reconnecting in 5s...");
  setTimeout(() => client.connect(), 5000);
});
