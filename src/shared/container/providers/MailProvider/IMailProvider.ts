interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: {
      name: string;
      link: string;
    },
    path: string
  ): Promise<void>;
}

export default IMailProvider;
