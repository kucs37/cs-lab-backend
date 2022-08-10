import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  studentCode: number;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;
}
// User.pre('create', function (next) {
//   const user: any = this;

//   // Make sure not to rehash the password if it is already hashed
//   if (!user.isModified('password')) {
//     return next();
//   }

//   // Generate a salt and use it to hash the user's password

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     // tslint:disable-next-line:no-shadowed-variable
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });
// User.beforeCreate(async (user) => {
//   const saltOrRounds = 12;
//   const hash = await bcrypt.hash(user.password, saltOrRounds);
//   const hashedPassword = hash;
//   user.password = hashedPassword;
// });
