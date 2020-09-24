import React, { useState } from 'react';
import { Layout } from 'antd';

import FriendsList, { IFriendsData } from './FriendsList';

import './ChatMenu.css';
import ChatContent from './ChatContent';

const { Header, Footer } = Layout;

export default function ChatMenu() {
  const [selectedFriend, setSelectedFriend] = useState({});

  const onSelectFriend = (friend: IFriendsData) => {
    setSelectedFriend(friend);
  }

  return (
    <div>
      <Layout>
        <FriendsList selectFriend={onSelectFriend}/>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <ChatContent friend={selectedFriend}/>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
