import { List } from "immutable";
import { Command } from "./Command";

import Ping from "./src/Ping";
import Help from "./src/Help";
import MotivateMe from "./src/MotivateMe";
import PublicDomain from "./src/PublicDomain";

export default List<Command>([
	new Help(),
	new MotivateMe(),
	new Ping(),
	new PublicDomain()
])