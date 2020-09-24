import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './FriendsListItem.css';

export default function FriendsListItem(props: any) {
  const statusStyle = props.friend.status === 'Online' ? { color: 'green' } : { color: 'red' };
  return (
    <div>
        <hr/>
        <Menu.Item className="friends-item" {...props}>
          <div className="friends-item-container">
            <Avatar icon={<UserOutlined />}/>
            <span>{props.friend.name}</span>
            <span style={statusStyle}>{props.friend.status}</span>
          </div>
        </Menu.Item>
        <hr/>
    </div>
  )
}
