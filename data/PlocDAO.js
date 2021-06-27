const { ObjectID } = require("bson");
const db = require("../config/bd");

class PlocDAO {
    async getAllPlocs() {
        const result = await db.get().collection(PLOCS_COLLECTION).find().toArray();
        return result;
    }

    async getPloc(plocId) {
        const ploc = await db.get().collection(PLOCS_COLLECTION).findOne({ _id: new ObjectID(plocId) });
        return ploc;
    }

    async createPloc(userId, ploc) {
        const {
            replyId,
            message,
            dateTime,
            hashtags,
            media,
            location,
            replies,
            mentions,
            likes,
            replocs,
        } = ploc;
        const result = await db.get().collection(PLOCS_COLLECTION).insertOne({
            userId,
            replyId,
            message,
            dateTime,
            hashtags,
            media,
            location,
            replies,
            mentions,
            likes,
            replocs,
        });

        return result.ops[0];
    }

    async deletePloc(id) {
        await db.get().collection(PLOCS_COLLECTION).deleteOne({
            _id: ObjectID(id),
        })
    }
}

const PLOCS_COLLECTION = "plocs";
module.exports = PlocDAO;