const bedrock = require("bedrock-protocol");

const SERVER_IP = "trysmp.net";
const SERVER_PORT = 19132;
const USERNAME = "quinnaufcola";
const ECONOMY_CMD = "/queue economy";

let position = { x: 0, y: 0, z: 0 };
let yaw = 0;

function startBot() {
  const client = bedrock.createClient({ host: SERVER_IP, port: SERVER_PORT, username: USERNAME, offline: true });

  client.on("join", () => {
    console.log("✅ Connected to TrySMP");
    client.queue("text",{ type:"chat", needs_translation:false, source_name:USERNAME, message:ECONOMY_CMD, xuid:"", platform_chat_id:"" });
    console.log("💬 Sent " + ECONOMY_CMD);
  });

  client.on("spawn", () => {
    setInterval(() => {
      yaw += 10;
      client.queue("player_auth_input", { pitch:0, yaw:yaw, position:position, move_vector:{x:0,z:0}, head_yaw:yaw, input_data:[], input_mode:1, play_mode:0, tick:0, delta:{x:0,y:0,z:0} });
      console.log("🌀 Anti-AFK move");
    }, 30000);
  });

  client.on("move_player", ({ position: pos }) => { position = pos; });
  client.on("error", (err) => console.log("⚠️ Error:", err));
  client.on("close", () => { console.log("❌ Connection closed, retrying in 5s..."); setTimeout(startBot,5000); });
}

startBot();
