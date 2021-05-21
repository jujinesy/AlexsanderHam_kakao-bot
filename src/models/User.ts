import { ObjectId } from "bson";
import { Long } from "node-kakao";
import IUser from '../interfaces/User';
import { userCollection } from '../mongo';

export default class User {

    constructor(
        public _id: ObjectId | null,
        public userId: Long,
        public channelId: Long,
        public nickname: string,
        public permissions: string[] = [],
    ) { }

    async save() {
        const { insertedId } = await userCollection.insertOne({
            userId: this.userId,
            channelId: this.channelId,
            nickname: this.nickname,
            permissions: this.permissions,
        });

        this._id = insertedId;
        return this;
    }

    static async find(filter: object = {}) {
        const users = await userCollection.find(filter).toArray();

        return users.map(user => this.prepare(user));
    }

    static async findOne(filter: object) {
        const user = await userCollection.findOne(filter);

        return this.prepare(user);
    }

    static async updateNickname(userId: Long, nickname: string) {
        const { result } = await userCollection.updateOne({ userId }, { $set: { nickname } });

        return result;
    }

    static async pushPermission(userId: Long, permission: string) {
        const { result } = await userCollection.updateOne({ userId }, { $addToSet: { permissions: permission } });

        return result;
    }

    static async pullPermission(userId: Long, permission: string) {
        const { result } = await userCollection.updateOne({ userId }, { $pull: { permissions: permission } });

        return result;
    }

    async checkPermission(permission: string) {
        return this.permissions.includes(permission);
    }

    protected static prepare(data: IUser | null) {
        if (!data) return null;

        return new User(
            data._id, 
            data.userId, 
            data.channelId, 
            data.nickname, 
            data.permissions
        );
    }

}