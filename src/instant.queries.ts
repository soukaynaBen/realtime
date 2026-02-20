type Direction = "asc" | "desc";

export const listMessagesQuery = (channel: string) => ({
  messages: {
    $: {
      where: { "channel.id": channel },
      order: { timestamp: "asc" as Direction },
    },
    author: {
      user: {},
    },
  },
});

export const listProfilesQuery = (user: Record<string, any>) => ({
  profiles: {
    $: {
      where: {
        "user.id": user.id,
      },
    },
  },
});

export const listChannelsQuery = () => ({ channels: {} });
