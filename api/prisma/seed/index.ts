import { coachingDBClient } from "../../src/lib/coachingDBClient";

import seedUsers from "./users/seedUsers";

const seed = async (): Promise<void> => {
  await seedUsers(coachingDBClient);
};

seed().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
