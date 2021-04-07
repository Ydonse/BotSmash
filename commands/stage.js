const prefix = process.env.PREFIX;

export default class Stage {
    
    match(message) {
        return message.content.startsWith(prefix);
    }
}