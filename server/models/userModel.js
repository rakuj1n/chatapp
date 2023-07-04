const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, min:3, max:20, unique: true},
    email: { type: String, required: true, unique: true, max:50},
    password: { type: String, required: true, max:8},
    isAvatarImageSet: { type: Boolean, default: false},
    avatarImage: { type: String, default: ""}
},{
    timestamps:true,
    toJSON: {
        transform: function(doc,ret) {
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

module.exports = mongoose.model("Users", userSchema)