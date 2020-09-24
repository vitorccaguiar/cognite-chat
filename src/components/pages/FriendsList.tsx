import React from 'react';
import { Layout, Menu } from 'antd';

import './FriendsList.css';
import FriendsListItem from './FriendsListItem';

const { Sider } = Layout;

export interface IFriendsData {
  name: string;
  status: string;
}

export default function FriendsList(props: any) {
  const friendsList: IFriendsData[] = [
    {
        name: 'Vitor',
        status: 'Online',
    },
    {
        name: 'Paulo',
        status: 'Online',
    },
    {
        name: 'Charles',
        status: 'Offline',
    }
  ]

  const onSelectFriend = (friend: IFriendsData) => {
    props.selectFriend(friend);
  }

  return (
    <Sider
    style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
    }}
    >
      <h2 className="friends-list-title">Friends List</h2>
      <Menu theme="dark" mode="inline">
          {
              friendsList.map((friendItem) => 
                <FriendsListItem key={friendItem.name} friend={friendItem} selectFriend={onSelectFriend}
              />)
          }
      </Menu>
    </Sider>
  )
}
