const { ObjectID } = require("bson");
const { Router } = require("express");
const router = Router();

const db = require("../config/bd");

const PLOCS_COLLECTION = "plocs";

router.get("/", async (req, res) => {
	const result = await db.get().collection(PLOCS_COLLECTION).find().toArray();
	res.send(result);
});

router.get("/:id", async (req, res) => {
    const plocId = req.params.id;
    const ploc = await db.get().collection(PLOCS_COLLECTION).findOne({ _id: new ObjectID(plocId) })
    res.send(ploc);
});

router.post("/", async (req, res) => {
	const { userId, replyId, message, dateTime, hashtags, media, location, replies, mentions } =
		req.body;

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
		likes: 0,
		replocs: 0,
	});

	res.send(result.ops[0]);
});

router.delete("/", (req, res) => {
	res.send("Ploc eliminado");
});

module.exports = router;
