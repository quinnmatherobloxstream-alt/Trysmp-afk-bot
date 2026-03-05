const mc = require('minecraft-protocol');

const client = mc.createClient({
  host: 'trysmp.net',       // Your server IP
  port: 19132,              // Default Bedrock port
  username: 'quinnaufcola', // Your username
  offline: true             // For offline mode
});

client.on('connect', () => {
  console.log('✅ Connected to TrySMP');
  // Send a command once connected
  client.write('chat', { message: '/queue economy' });

  // Start anti-AFK loop
  setInterval(() => {
    // Move slightly in random direction to prevent kick
    client.write('player', { x: 0, y: 0, z: 0 });
    console.log('🌀 Anti-AFK move');
  }, 30000);
});

client.on('error', (err) => console.log('⚠️ Error:', err));
client.on('end', () => {
  console.log('❌ Disconnected, reconnecting in 5s...');
  setTimeout(() => { client.connect(); }, 5000);
});
