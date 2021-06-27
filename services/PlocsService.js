const admin = require("firebase-admin");
const PlocDAO = require("../data/PlocDAO");
const plocDAO = new PlocDAO();

class PlocsService {
    async getAllPlocs() {
        try {
            const plocs = await plocDAO.getAllPlocs();
            return { error: null, data: plocs };
        } catch (error) {
            return { error, data: null };
        }
    }

    async getPlocById(plocId) {
        try {
            const ploc = await plocDAO.getPloc(plocId);
            return {error: null, data: ploc};
        } catch (error) {
            return {error, data: null};
        }
    }

    async createPloc(tokenId, ploc) {
        try {
            const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);
            const userId = decodedIdToken.uid;
            const createdPloc = await plocDAO.createPloc(userId, ploc)
            return {error: null, data: createdPloc};
        } catch (error) {
            return {error, data: null};
        }
    }

    async deletePloc(tokenId, plocId) {
        try {
            const decodedIdToken = await admin.auth().verifyIdToken(tokenId, true);
            const userId = decodedIdToken.uid;

            const result = await this.getPlocById(plocId)
            if(result.data.userId === userId) {
                await plocDAO.deletePloc(plocId);
                return {error: null, data: "Ploc eliminado"}
            }

            return {error: "Ploc no corresponde a usuario", data: null}
        } catch (error) {
            console.log(error);
            return {error, data: null}
        }
    }
}

module.exports = PlocsService;