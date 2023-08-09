import Bot from "./Bot"
import logger from "./modules/Logger"

import { TOKEN } from "../Env"

// import { Database } from "sqlite3"
// export const db =  new Database("db.sqlite")
// db.close()

const bot = new Bot() 
bot.login(TOKEN)

logger.info("Here we go")

process.on('SIGINT', () => {
	logger.info("Caught interrupt signal");

	// db.close()
	bot.disconnect()

	logger.info("Bye bye !");
	setTimeout(() => {
		process.exit(0)
	}, 200)
});