const { Router } = require("express");
const router = Router();
const PlocsService = require("../services/PlocsService");
const Ploc = require("../data/Ploc");
const plocsService = new PlocsService();

router.get("/", async (req, res) => {
	const {error, data} = await plocsService.getAllPlocs();
	if(error === null) {
		return res.send(data);
	}
	
	return res.status(500).send(error);
});

router.get("/:id", async (req, res) => {
    const plocId = req.params.id;
	const {error, data} = await plocsService.getPlocById(plocId);

	if(error === null) {
		return res.send(data);
	}

	return res.status(500).send(error);
});

router.post("/", async (req, res) => {
	const { tokenId, replyId, message, dateTime, hashtags, media, location, replies, mentions } =
		req.body;

	const newPloc = new Ploc(tokenId, replyId, message, dateTime, hashtags, media, location, replies, mentions, 0, 0)
	const {error, data} = await plocsService.createPloc(tokenId, newPloc);
	if(error === null) {
		return res.send(data);
	}

	return res.status(500).send(error);
});

router.delete("/:id", async (req, res) => {
	const {tokenId} = req.body;
	const {id} = req.params;
	const {error, data} = await plocsService.deletePloc(tokenId, id);
	if(error === null) {
		return res.send(data)
	}
	
	return res.status(500).send(error);
});

module.exports = router;
