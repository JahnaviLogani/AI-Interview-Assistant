
import React, { useState } from 'react';
import { Layout, Tabs, ConfigProvider, theme } from 'antd';
import IntervieweeView from './components/Interviewee/IntervieweeView';
import InterviewerDashboard from './components/Interviewer/InterviewerDashboard';
import './styles/App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  // Note: In a real app, this might be driven by URL routing
  const [activeTab, setActiveTab] = useState('interviewee');

  const items = [
    {
      key: 'interviewee',
      label: 'Interviewee',
      children: <IntervieweeView />,
    },
    {
      key: 'interviewer',
      label: 'Interviewer',
      children: <InterviewerDashboard />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Layout className="layout">
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo">Crisp AI Interview</div>
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <div className="site-layout-content">
            <Tabs
              defaultActiveKey="interviewee"
              activeKey={activeTab}
              onChange={setActiveTab}
              items={items}
            />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
