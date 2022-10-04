declare interface MessageAuthor {
  name: string;
  color: string;
}

declare interface Message {
  date: Date;
  text: string;
  author: MessageAuthor;
}
