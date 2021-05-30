const { MongoClient, Db } = require("mongodb");
let client = null;

async function connect(url) {
	try {
		client = await MongoClient.connect(url, {
            useUnifiedTopology: true,
        });
		console.log("Conexión a la base exitosa");
		return client;
	} catch (error) {
		console.log("Error de conexión a la BD");
		console.error(error);
		process.exit(-1);
	}
}

module.exports = {
	connect,
	/**
	 * 
	 * @returns {Db} 
	 */
	get() {
		if (client === null) {
			return;
		}

		return client.db("plic-ploc");
	},
};
