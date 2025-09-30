
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Interview } from '../types';

interface InterviewState {
  interviews: Record<string, Interview>;
  activeInterviewId: string | null;
}

const initialState: InterviewState = {
  interviews: {},
  activeInterviewId: null,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    startInterview: (state, action: PayloadAction<{ id: string; candidate: Interview['candidate'] }>) => {
      const { id, candidate } = action.payload;
      const newInterview: Interview = {
        id,
        candidate,
        status: 'in-progress',
        questions: [], // Questions will be generated and added
        answers: [],
        currentQuestionIndex: 0,
        finalScore: null,
        finalSummary: null,
        startTime: Date.now(),
      };
      state.interviews[id] = newInterview;
      state.activeInterviewId = id;
    },
    // Add other reducers here:
    // setQuestions, addAnswer, completeInterview, etc.
    resumeInterview: (state, action: PayloadAction<string>) => {
      if (state.interviews[action.payload]) {
        state.activeInterviewId = action.payload;
      }
    },
    updateCandidateInfo: (state, action: PayloadAction<{ name?: string, email?: string, phone?: string }>) => {
      if (state.activeInterviewId && state.interviews[state.activeInterviewId]) {
          const interview = state.interviews[state.activeInterviewId];
          interview.candidate = { ...interview.candidate, ...action.payload };
      }
    },
    clearState: () => initialState,
  },
});

export const { startInterview, resumeInterview, updateCandidateInfo, clearState } = interviewSlice.actions;

export default interviewSlice.reducer;
