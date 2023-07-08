const Message = require('../models/messageModel')

module.exports.addMsg = async (req,res,next) => {
    try {
        const { from, to, message } = req.body
        const data = await Message.create({
            message: { text: message },
            users: [from,to],
            sender: from,
        })
        if (data) return res.status(200).json({msg:"Message added successfully."})
        return res.status(400).json({msg:"Failed to add message to the database."})
    } catch (ex) {
        next(ex)
    }
}

module.exports.getAllMsg = async (req,res,next) => {
    try {
        const { from, to } = req.body
        const messages = await Message
        .find({ users: { $all: [from, to] } })
        .sort({ updatedAt: 1 })
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.status(200).json(projectMessages)
    } catch (ex) {
        next(ex)
    }
}