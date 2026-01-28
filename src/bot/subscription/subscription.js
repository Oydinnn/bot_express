export const checkSubscription = async (ctx) => {
  try {
    const chatId = ctx.from.id;
    const channel = "@mkljnmjkjkb";

    const member = await ctx.telegram.getChatMember(channel, chatId);
    // console.log(member);
    return ["adminstrator", "creator", "member"].includes(member.status);
  } catch (error) {
    console.log(error);
    return false
    
  }
};
