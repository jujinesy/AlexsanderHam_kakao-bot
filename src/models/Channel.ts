import { ObjectId } from "bson";
import { Long, ChannelType } from "node-kakao";
import IChannel from '../interfaces/Channel';
import { channelCollection } from '../mongo';

export default class Channel {

    constructor(
        public _id: ObjectId | null,
        public channelId: Long,
        public channelType: ChannelType,
        public channelName: string,
        public permissions: string[] = [],
    ) { }

    async save() {
        const { insertedId } = await channelCollection.insertOne({
            channelId: this.channelId,
            channelType: this.channelType,
            channelName: this.channelName,
            permissions: this.permissions,
        });

        this._id = insertedId;
        return this;
    }

    static async find(filter: object = {}) {
        const channels = await channelCollection.find(filter).toArray();

        return channels.map(channel => this.prepare(channel));
    }

    static async findOne(filter: object) {
        const channel = await channelCollection.findOne(filter);

        return this.prepare(channel);
    }

    static async updateChannelName(channelId: Long, channelName: string) {
        const { result } = await channelCollection.updateOne({ channelId }, { $set: { channelName } });

        return result;
    }

    static async pushPermission(channelId: Long, permission: string) {
        const { result } = await channelCollection.updateOne({ channelId }, { $addToSet: { permissions: permission } });

        return result;
    }

    static async pullPermission(channelId: Long, permission: string) {
        const { result } = await channelCollection.updateOne({ channelId }, { $pull: { permissions: permission } });

        return result;
    }

    protected static prepare(data: IChannel | null) {
        if (!data) return null;

        return new Channel(
            data._id, 
            data.channelId,
            data.channelType,
            data.channelName,
            data.permissions
        );
    }

}