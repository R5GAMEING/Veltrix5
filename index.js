
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  PermissionsBitField
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const PREFIX = ">";
const TOKEN = "PUT_YOUR_BOT_TOKEN_HERE";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

function dashboardEmbed() {
  return new EmbedBuilder()
    .setColor("#2b2d31")
    .setTitle("Hey, I'm ZenoX™")
    .setDescription(`
A All-In-One Bot With All Features You Need.

• My Prefix is \`${PREFIX}\`
• Total Commands: \`20+\`
• Choose a Specific Module of your Desire
    `)
    .addFields(
      { name: "🔐 Security", value: "Antinuke & Protection", inline: true },
      { name: "⚙ Utility", value: "Useful tools", inline: true },
      { name: "🛡 Moderation", value: "Ban, Kick, Clear", inline: true },
      { name: "🎟 Ticket", value: "Ticket System", inline: true },
      { name: "🎉 Giveaway", value: "Giveaway System", inline: true },
      { name: "🎵 Music", value: "Music Player", inline: true },
      { name: "🤖 AI", value: "Artificial Intelligence", inline: true },
      { name: "🎭 ReactionRole", value: "Role System", inline: true },
      { name: "📜 Logging", value: "Server Logs", inline: true }
    )
    .setFooter({ text: "All In One Dashboard Bot" });
}

function dashboardMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("dashboard_select")
      .setPlaceholder("Select a Module")
      .addOptions([
        { label: "Security", value: "security", emoji: "🔐" },
        { label: "Utility", value: "utility", emoji: "⚙" },
        { label: "Moderation", value: "moderation", emoji: "🛡" },
        { label: "Ticket", value: "ticket", emoji: "🎟" },
        { label: "Giveaway", value: "giveaway", emoji: "🎉" },
        { label: "Music", value: "music", emoji: "🎵" },
        { label: "AI", value: "ai", emoji: "🤖" },
        { label: "Reaction Role", value: "rr", emoji: "🎭" },
        { label: "Logging", value: "logging", emoji: "📜" }
      ])
  );
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === PREFIX + "dashboard") {
    message.channel.send({
      embeds: [dashboardEmbed()],
      components: [dashboardMenu()]
    });
  }

  if (message.content.startsWith(PREFIX + "ban")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
      return message.reply("No permission.");
    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention user.");
    member.ban();
    message.reply("User banned.");
  }

  if (message.content.startsWith(PREFIX + "kick")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
      return message.reply("No permission.");
    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention user.");
    member.kick();
    message.reply("User kicked.");
  }

  if (message.content === PREFIX + "ping") {
    message.reply("Pong!");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const value = interaction.values[0];
  let embed = new EmbedBuilder().setColor("#2b2d31");

  if (value === "security")
    embed.setTitle("🔐 Security Module").setDescription("• AntiSpam\n• AntiBot\n• Raid Protection");

  if (value === "utility")
    embed.setTitle("⚙ Utility Module").setDescription("• Avatar\n• Userinfo\n• Serverinfo");

  if (value === "moderation")
    embed.setTitle("🛡 Moderation Module").setDescription("• Ban\n• Kick\n• Clear");

  if (value === "ticket")
    embed.setTitle("🎟 Ticket Module").setDescription("• Create Ticket\n• Close Ticket");

  if (value === "giveaway")
    embed.setTitle("🎉 Giveaway Module").setDescription("• Start\n• End\n• Reroll");

  if (value === "music")
    embed.setTitle("🎵 Music Module").setDescription("• Play\n• Skip\n• Stop");

  if (value === "ai")
    embed.setTitle("🤖 AI Module").setDescription("• Chat AI\n• Smart Reply");

  if (value === "rr")
    embed.setTitle("🎭 Reaction Role").setDescription("• Add Role\n• Remove Role");

  if (value === "logging")
    embed.setTitle("📜 Logging Module").setDescription("• Message Logs\n• Member Logs");

  interaction.update({
    embeds: [embed],
    components: [dashboardMenu()]
  });
});

client.login(TOKEN);
