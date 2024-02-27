import { List } from "immutable";
import { Command } from "./Command";

import Ping from "./src/Ping";
import Help from "./src/Help";
import MotivateMe from "./src/MotivateMe";
import PublicDomain from "./src/PublicDomain";
import Votation from "./src/Votation";
import FakeMessage from "./src/FakeMessage";
import ScheduleMessage from "./src/ScheduleMessage";
import Rename from "./src/Rename";

export default List<Command>([
	new Help(),
	new MotivateMe(),
	new Ping(),
	new PublicDomain(),
	new Votation(),
	new FakeMessage(),
	new ScheduleMessage(),
	new Rename()
])