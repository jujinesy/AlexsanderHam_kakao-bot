import { ObjectId } from "bson";
import { Long } from "node-kakao";

export default interface User {
    _id: ObjectId;
    userId: Long;
    channelId: Long;
    nickname: string;
    permissions: string[];
}