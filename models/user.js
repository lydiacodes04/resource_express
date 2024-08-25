const mongoose = require("mongoose");

// const bcrypt = require("bcryptjs");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// There is an issue here. Postman tests would not run unless this was commented out. I don't know where the problem is.

// userSchema.statics.findUserByCredentials = function findUserByCredentials(
//   email,
//   password,
// ) {
//   return this.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error("Incorrect email or password"));
//       }
//       return bcrypt
//         .compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error("Incorrect email or password"));
//           }
//           return user;
//         })
//         .catch((err) => {
//           console.error(err);
//           if (err.code === 11000) {
//             return res
//               .status(CONFLICT_ERROR_CODE)
//               .send({ message: "Duplicate error" });
//           }
//           return res
//             .status(DEFAULT_ERROR_CODE)
//             .send({ message: "An error has occurred on the server." });
//         });
//     });
// };

module.exports = mongoose.model("user", userSchema);
