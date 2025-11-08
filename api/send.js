// api/send.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  // Make sure Discord webhook URL is set in environment variables
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
  if (!DISCORD_WEBHOOK) {
    return res.status(500).json({ error: "Webhook URL not set" });
  }

  try {
    // Parse request body
    const { content, username } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content missing" });
    }

    // Send message to Discord
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

    // Success
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
