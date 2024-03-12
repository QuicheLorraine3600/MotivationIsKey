# March 2024 update

## Unparalled monkeys management techniques

### The Accounting entry

The words "Accounting entry" are used to describe a variety of payements that must be made. The name is intentionnaly kept neutral in tone, so that the same
objects and commands can be used for fines (when a monkey fails to follow the laws), or taxes (e.g. for the incoming propaganda website)

db.sqlite:
	CREATE TABLE "scheduled_messages" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "cron" TEXT NOT NULL, "guildId" TEXT NOT NULL, "channelId" TEXT NOT NULL, "message" TEXT NOT NULL, "author" TEXT NOT NULL, "avatar" TEXT NOT NULL)

	CREATE TABLE "accounting" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "sending_monkey" TEXT NOT NULL, "receiving_monkey" TEXT NOT NULL, "amount" INTEGER NOT NULL, "unit" TEXT NOT NULL, "payed" INTEGER NOT NULL)