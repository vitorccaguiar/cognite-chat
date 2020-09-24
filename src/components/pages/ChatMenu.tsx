import React from 'react';
import { Layout } from 'antd';

import './ChatMenu.css';

const { Header, Content, Footer } = Layout;

export default function ChatMenu() {
  return (
    <div>
      <Layout>
        {/* Add friends list here */}
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="content-container" style={{ padding: 24 }}>
              Content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
