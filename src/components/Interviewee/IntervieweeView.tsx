
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ResumeUpload from './ResumeUpload';
import ChatWindow from './ChatWindow';

const IntervieweeView: React.FC = () => {
  const activeInterview = useSelector((state: RootState) => {
    const activeId = state.interview.activeInterviewId;
    return activeId ? state.interview.interviews[activeId] : null;
  });

  // This is a simplified state check.
  // A more robust implementation would use the 'status' field of the interview state.
  if (!activeInterview || activeInterview.status === 'pending-resume') {
    return <ResumeUpload />;
  }

  if (activeInterview.status === 'in-progress' || activeInterview.status === 'gathering-info') {
    return <ChatWindow />;
  }
    
  if (activeInterview.status === 'completed') {
    return (
        <div>
            <h2>Interview Completed!</h2>
            <p>Thank you for your time. The interviewer will be in touch.</p>
            <p><strong>Final Summary:</strong> {activeInterview.finalSummary}</p>
        </div>
    );
  }

  return <ResumeUpload />;
};

export default IntervieweeView;
