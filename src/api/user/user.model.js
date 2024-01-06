import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required.'],
			trim: true
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, 'Email is invalid.']
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password must be at least 6 characters'],
			trim: true
		}
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(8);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

/**
 * Compare password with the hashed password
 * @param {string} candidatePassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
	try {
		return await bcrypt.compare(candidatePassword, this.password);
	} catch (error) {
		throw error;
	}
};

/**
 * @typedef {mongoose.Document & {
 *  name: string,
 *  email: string,
 *  password: string,
 *  comparePassword: (candidatePassword: string) => Promise<boolean>,
 *  createdAt: Date,
 *  updatedAt: Date
 * }} UserDoc
 */

/**
 * @type {mongoose.Model<UserDoc>}
 */
const User = model('User', userSchema);

export default User;
