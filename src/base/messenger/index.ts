// Messenger abstract class
abstract class Messenger {
  protected ready = false;

  public isReady(): boolean {
    return this.ready;
  }

  /**
   * This function sends a message using the messenger module.
   * @param destination Chat Id from the message receiver
   * @param message Message body
   */
  abstract sendMessage(destination: string, message: string): Promise<boolean>;
}

export default Messenger;

