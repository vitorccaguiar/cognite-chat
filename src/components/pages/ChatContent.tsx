import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';

import './ChatContent.css';

const { TextArea } = Input;
const { Content } = Layout;

export interface IMessage {
  value: string;
  friendId: number;
}

export default function ChatContent(props: any) {
  const { friend } = props;
  const [messages, setMessages] = useState([] as IMessage[]);
  const [message, setMessage] = useState({} as IMessage);

  const addMessage = () => {
    setMessages([message, ...messages]);
    setMessage({} as IMessage);
  }

  useEffect(() => {
    setMessages([] as IMessage[]);
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
            { messages.map((message) => <div className="chat-content-message"> {message.value} </div> )}
            </div>
            <div className="chat-content-write">
              <TextArea rows={4} autoSize={{maxRows: 3, minRows: 3}} value={message.value} onChange={e => setMessage({value: e.target.value, friendId: friend.id})}/>
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
