
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ChatWindow: React.FC = () => {
  const activeInterview = useSelector((state: RootState) => {
    const activeId = state.interview.activeInterviewId;
    return activeId ? state.interview.interviews[activeId] : null;
  });

  if (!activeInterview) {
    return <p>No active interview.</p>;
  }

  // This is a placeholder UI. A real implementation would have a chat bubble interface,
  // timer, progress bar, and input field for answers.
  return (
    <Card title="Interview in Progress">
      <Title level={4}>Welcome, {activeInterview.candidate.name || 'Candidate'}!</Title>
      <Paragraph>Your interview is about to begin. The first question will appear below.</Paragraph>
      <Card type="inner" title="Question 1">
        <Paragraph>This is where the interview question, timer, and answer input will go.</Paragraph>
      </Card>
    </Card>
  );
};

export default ChatWindow;
