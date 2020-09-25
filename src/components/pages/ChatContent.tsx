import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';

import './ChatContent.css';

const { TextArea } = Input;
const { Content } = Layout;

export interface IMessage {
  id?: number;
  value: string;
}

export interface ILocalStorageMessage {
  friendId: number;
  messages: IMessage[];
}

export default function ChatContent(props: any) {
  const { friend } = props;
  const [messages, setMessages] = useState([] as IMessage[]);
  const [message, setMessage] = useState({} as IMessage);
  let idCounter: number;
  const result = localStorage.getItem('message-id');
  if (result) {
    idCounter = parseInt(result, 10);
  } else {
    idCounter = 1;
    localStorage.setItem('message-id', '1');
  }


  const addMessage = () => {
    message.id = idCounter++;
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
    setMessage({} as IMessage);
    const messageId: string | null = localStorage.getItem('message-id');
    if (messageId) {
      localStorage.setItem('message-id', (parseInt(messageId) + 1).toString());
    }
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

  const onEnterPress = (e: any) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  }

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
            { messages.map((message) => <div key={message.id} className="chat-content-message"> {message.value} </div> )}
            </div>
            <div className="chat-content-write">
              <TextArea rows={4} autoSize={{maxRows: 3, minRows: 3}} value={message.value}
                onChange={e => setMessage( { value: e.target.value })}
                onKeyDown={onEnterPress}/>
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
