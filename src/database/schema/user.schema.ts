import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as bcrypt from 'bcrypt';
import { Document } from "mongoose";
@Schema()
export class RoleDB {
  @Prop({ required: true })
  displayRole: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  roleLevel: number;

  // @Prop({ type: Date, required: true, default: Date.now })
  // createAt: Date;
}
export const RoleSchema = SchemaFactory.createForClass(RoleDB);

@Schema()
export class UserDB extends Document {
  @Prop({ required: true, unique: true })
  studentId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: [RoleSchema] })
  role: RoleDB[];
}

export const UserSchema = SchemaFactory.createForClass(UserDB);

// export const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
// tslint:disable-next-line:space-before-function-paren
// UserSchema.pre('save', function (next) {
// const user: any = this;

// // Make sure not to rehash the password if it is already hashed
// if (!user.isModified('password')) {
//     return next();
// }

// // Generate a salt and use it to hash the user's password

// bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//         return next(err);
//     }

//     // tslint:disable-next-line:no-shadowed-variable
//     bcrypt.hash(user.password, salt, (err, hash) => {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });
// });
