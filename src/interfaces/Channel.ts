import { ObjectId } from "bson";
import { Long, ChannelType } from "node-kakao";

export default interface Channel {
    _id: ObjectId;
    channelId: Long;
    channelType: ChannelType;
    channelName: string;
    permissions: string[];
}