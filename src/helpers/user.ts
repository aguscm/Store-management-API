const chance = require("chance").Chance();
import type { IUser } from "../interfaces";

export const loginUser: IUser = {
  tokenId: chance.guid(),
  name: chance.name(),
  lastName: chance.last(),
  email: chance.email({ domain: "mgt.com" }),
  password: chance.string({ length: 10 }),
};
