const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long."],
  },
  avatar: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
    maxlength: 150,
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'UserManager'
  }],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserManager'
    },
  ],
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserManager'
    },
  ],
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  }
}, {timestamps: true});
UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    console.log(this.password)
    console.log(this.confirmPassword)
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('UserManager', UserSchema);