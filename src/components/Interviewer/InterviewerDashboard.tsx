import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { List, Card, Typography, Empty } from 'antd';
// Fix: Import the Interview type to use for type annotations.
import { Interview } from '../../types';

const { Paragraph } = Typography;

const InterviewerDashboard: React.FC = () => {
  const interviews = useSelector((state: RootState) => 
    Object.values(state.interview.interviews)
  );

  // Fix: Add explicit type annotations for the arguments in filter and sort callbacks.
  // This resolves errors where properties were accessed on an 'unknown' type.
  const completedInterviews = interviews
    .filter((iv: Interview) => iv.status === 'completed')
    .sort((a: Interview, b: Interview) => (b.finalScore || 0) - (a.finalScore || 0)); // Sort by score descending

  if (completedInterviews.length === 0) {
    return <Empty description="No completed interviews yet." />;
  }
  
  return (
    <div>
      <h2>Candidate Dashboard</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={completedInterviews}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.candidate.name}>
                <Paragraph><strong>Score:</strong> {item.finalScore !== null ? `${item.finalScore}%` : 'N/A'}</Paragraph>
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                    <strong>Summary:</strong> {item.finalSummary || 'No summary available.'}
                </Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default InterviewerDashboard;
