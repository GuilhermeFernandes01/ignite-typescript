import IMailProvider from '../IMailProvider';

interface IMessage {
  to: string;
  subject: string;
  variables: {
    name: string;
    link: string;
  };
  path: string;
}

class MailProviderInMemory implements IMailProvider {
  private message: IMessage[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: { name: string; link: string },
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export default MailProviderInMemory;
