const prefix = process.env.PREFIX;

module.exports = class Stage {
    
    static match(message) {
        return message.content.startsWith(prefix);
    }
}