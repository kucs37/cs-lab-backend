import { UserSchema } from "./schema/user.schema";

export enum EntityEnumMongo {
  userDB = "user",
  roleDB = "role",
  productDB = "product",
  dateStartAndEndDB = "dateStartAndEndDBSchema",
  messageDB = "message",
  paymentDB = "payment",
  webSettingDB = "webSetting",
}

export const EntityProvidersMongo = [
  { name: EntityEnumMongo.userDB, schema: UserSchema },
];
