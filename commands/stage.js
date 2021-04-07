const prefix = process.env.PREFIX;

module.exports = class Stage {
    
    match(message) {
        return message.content.startsWith(prefix);
    }
}