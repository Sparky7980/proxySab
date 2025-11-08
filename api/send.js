// api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  // Replace this with your real Discord webhook
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

  const { content, username } = req.body;

  const response = await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      username: username || "Roblox Bot",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(500).json({ error: text });
  }

  res.status(200).json({ success: true });
}
