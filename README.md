# Motivation is Key, official MonkeyTeam Discord Bot

# March 2024 update

## Unparalled monkeys management techniques

### The Accounting entry

The words "Accounting entry" are used to describe a variety of payements that must be made. The name is intentionnaly kept neutral in tone, so that the same
objects and commands can be used for fines (when a monkey fails to follow the laws), or taxes (e.g. for the incoming propaganda website)


# How to setup the bot for development purpose
Important: do not use the real bot (MOTIVATION IS KEY#0999) for development !

1. Get Discord credentials here: https://discord.com/developers/applications

2. Clone this repo
	```
	git clone git@github.com:QuicheLorraine3600/MotivationIsKey.git
	```


3. Install the dependencies
	```
	npm install
	```
	Note: the bot requires TypeScript, you might need to install it by your own

4. Set the env variables TOKEN, CLIENT_ID with your bot credentials. Set the env variable GUILD_ID with your development server. You can create a custom script for that.

5. Deploy the slash commands
	```
	npm run deploy
	```

6. Finally, start the bot
	```
	npm start
	```


## Current database structure
db.sqlite:

	```
	CREATE TABLE "scheduled_messages" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "cron" TEXT NOT NULL, "guildId" TEXT NOT NULL, "channelId" TEXT NOT NULL, "message" TEXT NOT NULL, "author" TEXT NOT NULL, "avatar" TEXT NOT NULL)

	CREATE TABLE "accounting" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "sending_monkey" TEXT NOT NULL, "receiving_monkey" TEXT NOT NULL, "amount" INTEGER NOT NULL, "unit" TEXT NOT NULL, "payed" INTEGER NOT NULL)
	```

Note: The file is created with the correct structure automatically if not present