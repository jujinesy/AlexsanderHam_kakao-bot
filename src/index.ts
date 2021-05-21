import { TalkClient, TalkChatData, TalkChannel } from 'node-kakao';

import Auth from './controllers/Auth';

const CLIENT = new TalkClient();

Auth.login(CLIENT);

CLIENT.on('chat', async (data: TalkChatData, channel: TalkChannel) => {
    const sender = data.getSenderInfo(channel);
    if (!sender) return;
    
    console.log(`${new Date().toLocaleString()} : ${channel.getDisplayName()}}`);


});