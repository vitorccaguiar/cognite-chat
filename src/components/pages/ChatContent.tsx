import React from 'react';
import { Layout } from 'antd';

import './ChatContent.css';

const { Content } = Layout;

export default function ChatContent(props: any) {
  const { friend } = props;

  return (
    <div className="chat-content-container">
      <Content style={{ overflow: 'initial' }}>
        <div className="chat-content-group">
          <div className="chat-content-header">
            {friend?.name ? `${friend.name} - ${friend.status}` : ''}
          </div>
          <div className="chat-content-window">
            window
          </div>
          <div className="chat-content-write">
            writing
          </div>
        </div>
      </Content>
    </div>
  )
}
