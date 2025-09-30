
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { parseResume } from '../../services/resumeParser';
import { extractInfoFromResume } from '../../services/geminiService';
import { startInterview } from '../../store/interviewSlice';

const ResumeUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error('Please select a file first.');
      return;
    }
    setLoading(true);
    const file = fileList[0] as any;

    try {
      const resumeText = await parseResume(file);
      const extractedInfo = await extractInfoFromResume(resumeText);
      
      const interviewId = `interview-${Date.now()}`;
      const candidate = {
        id: `candidate-${Date.now()}`,
        name: extractedInfo.name || '',
        email: extractedInfo.email || '',
        phone: extractedInfo.phone || '',
      }

      dispatch(startInterview({ id: interviewId, candidate }));
      message.success('Resume processed successfully!');

    } catch (error) {
      console.error(error);
      message.error('Failed to process resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Processing Resume...">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2>Upload Your Resume</h2>
        <p>Please upload your resume in PDF or DOCX format to begin.</p>
        <Upload
          fileList={fileList}
          beforeUpload={(file) => {
            setFileList([file]);
            return false; // Prevent auto-upload
          }}
          onRemove={() => setFileList([])}
          accept=".pdf,.docx"
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={loading}
          style={{ marginTop: 16 }}
        >
          Start Interview
        </Button>
      </div>
    </Spin>
  );
};

export default ResumeUpload;
