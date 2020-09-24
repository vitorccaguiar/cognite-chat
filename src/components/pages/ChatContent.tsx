import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';

import './ChatContent.css';

const { TextArea } = Input;
const { Content } = Layout;

export interface ILocalStorageMessage {
  friendId: number;
  messages: string[];
}

export default function ChatContent(props: any) {
  const { friend } = props;
  const [messages, setMessages] = useState([] as string[]);
  const [message, setMessage] = useState('' as string);


  const addMessage = () => {
    const mergedMessages = [message, ...messages];
    const messagesWithFriend: ILocalStorageMessage = {
      friendId: friend.id,
      messages: mergedMessages
    }
    let messagesPersisted: string | null = localStorage.getItem('messages');
    if (messagesPersisted) {
      const parsedMessagesPersisted: ILocalStorageMessage[] | undefined = JSON.parse(messagesPersisted);
      if (parsedMessagesPersisted) {
        const index: number = parsedMessagesPersisted.findIndex((item: ILocalStorageMessage) => item.friendId === friend.id);
        if (index !== -1) {
          parsedMessagesPersisted[index].messages = mergedMessages;
          localStorage.setItem('messages', JSON.stringify(parsedMessagesPersisted));
        } else {
          parsedMessagesPersisted.push(messagesWithFriend);
          localStorage.setItem('messages', JSON.stringify(parsedMessagesPersisted));
        }
      }
    } else {
      localStorage.setItem('messages', JSON.stringify([messagesWithFriend]));
    }
    setMessages(mergedMessages);
    setMessage('' as string);
  }

  useEffect(() => {
    const getMessages = () => {
      let chatMessages = [];
      let messagesPersisted = localStorage.getItem('messages');
      if (messagesPersisted) {
        const parsedMessagesPersisted = JSON.parse(messagesPersisted);
        if (parsedMessagesPersisted) {
          const result = parsedMessagesPersisted.find((message: any) => message.friendId === friend.id);
          chatMessages = result ? result.messages : [];
        }
      }
      return chatMessages;
    }
    setMessages(getMessages());
  }, [friend])

  const statusStyle = friend.status === 'Online' ? { color: 'green' } : { color: 'red' };

  return (
    <div className="chat-content-container">
      {friend?.name ?
        <Content style={{ overflow: 'initial' }}>
          <div className="chat-content-group">
            <div className="chat-content-header">
              {friend?.name ?
                <div>
                  <span>{friend.name}</span>
                  <span> - </span>
                  <span style={statusStyle}>{friend.status}</span>
                </div>
                : undefined
              }
            </div>
            <div className="chat-content-window">
            { messages.map((message) => <div className="chat-content-message"> {message} </div> )}
            </div>
            <div className="chat-content-write">
              <TextArea rows={4} autoSize={{maxRows: 3, minRows: 3}} value={message} onChange={e => setMessage( e.target.value)}/>
              <Button type="primary" style={{marginLeft: '8px'}} onClick={addMessage}>
                Submit
              </Button>
            </div>
          </div>
        </Content>
      : undefined}
    </div>
  )
}
