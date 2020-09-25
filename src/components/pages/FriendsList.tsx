import React, { useState } from 'react';
import { Layout, Menu, Button, Divider, Modal, Input } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import './FriendsList.css';
import FriendsListItem from './FriendsListItem';

const { Sider } = Layout;

export interface IFriendsData {
  id: number;
  name: string;
  status: string;
}

export default function FriendsList(props: any) {
  let friends = localStorage.getItem('friends');
  const parsedFriends = friends ? JSON.parse(friends) as IFriendsData[] : null;
  const [visible, setVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [friendsList, setFriendsList] = useState(parsedFriends);
  let idCounter: number;
  const result = localStorage.getItem('friends-id');
  if (result) {
    idCounter = parseInt(result, 10);
  } else {
    idCounter = 1;
    localStorage.setItem('friends-id', '1');
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    const friend: IFriendsData = {
      id: idCounter++,
      name: newFriendName,
      status: 'Online'
    }
    let friends = localStorage.getItem('friends');
    if (friends) {
      const parsedFriends = JSON.parse(friends) as IFriendsData[];
      parsedFriends.push(friend);
      localStorage.setItem('friends', JSON.stringify(parsedFriends));
      setFriendsList(parsedFriends);
    } else {
      localStorage.setItem('friends', JSON.stringify([friend]));
      setFriendsList([friend]);
    }
    setNewFriendName('');
    const friendsId: string | null = localStorage.getItem('friends-id');
    if (friendsId) {
      localStorage.setItem('friends-id', (parseInt(friendsId) + 1).toString());
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSelectFriend = (friend: IFriendsData) => {
    props.selectFriend(friend);
  }

  return (
    <div>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className="friends-list-sider-container">
          <h2 className="friends-list-title">Friends List</h2>
          <Button type="primary" shape="circle" icon={<UserAddOutlined />} className="friends-item-add-button" onClick={showModal} />
        </div>
        <Menu theme="dark" mode="inline">
          {
            friendsList?.map((friendItem: IFriendsData) =>
              <FriendsListItem key={friendItem.id} friend={friendItem} selectFriend={onSelectFriend}/>)
          }
        </Menu>
        <Divider />
      </Sider>
      <Modal
        title="Add friend"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Type the name of your friend:
        <Input value={newFriendName} onChange={e => setNewFriendName(e.target.value)}/>
      </Modal>
    </div>
  )
}
