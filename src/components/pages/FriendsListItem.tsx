import React from 'react';
import { Menu, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './FriendsListItem.css';

export default function FriendsListItem(props: any) {
  const statusStyle = props.friend.status === 'Online' ? { color: 'green' } : { color: 'red' };
  const {friend, selectFriend, ...other} = props;

  const onSelectFriend = () => {
    props.selectFriend(props.friend);
  }
  return (
    <div>
        <Divider className="friends-item-divider"/>
        <Menu.Item className="friends-item" {...other} onClick={onSelectFriend}>
          <div className="friends-item-container">
            <Avatar icon={<UserOutlined />}/>
            <span>{props.friend.name.length > 8 ? `${props.friend.name.slice(0, 9)}...` : props.friend.name}</span>
            <span style={statusStyle}>{props.friend.status}</span>
          </div>
        </Menu.Item>
    </div>
  )
}
