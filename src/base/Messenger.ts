abstract class Messenger {
    protected ready: boolean = false;

    abstract sendMessage(chatId: string, message: string|object): void;
    abstract getName(chatId: string): string;
}

export default Messenger