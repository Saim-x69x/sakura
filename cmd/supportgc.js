module.exports = {
  config: {
    name: "supportgc",
    aliases: ["supportgroup"],
    version: "1.0",
    author: "Saimx69x",
    countDown: 5,
    role: 0,
    description: {
      en: "Adds the user to the official support group for help, updates, and discussions."
    },
    category: "support group",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, threadsData, message }) {
    const supportGroupThreadID = "1344835506883752";

    try {
      const groupInfo = await threadsData.get(supportGroupThreadID);
      const isMember = groupInfo.members.some(
        member => member.userID === event.senderID && member.inGroup
      );

      if (isMember) {
        return message.reply(
          "⚠ You are already part of our Support Group."
        );
      }

      await api.addUserToGroup(event.senderID, supportGroupThreadID);

      return message.reply(
        "✅ Access Granted!\nYou are now connected to the our Support Group."
      );

    } catch (error) {
      console.error("SupportGC Add Error:", error);

      return message.reply(
        "❌ Unable to add you to the Support Group.\nEnsure your profile is visible or send a friend request to the bot and try again."
      );
    }
  }
};
