interface MessageAuthor {
  name: string;
  color: string;
}

interface Message {
  date: Date;
  text: string;
  author: MessageAuthor;
}
