import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  responses: [],
};
const responsesSlice = createSlice({
  name: "quizGrades",
  initialState,
  reducers: {
    setResponses: (state, action) => {
      state.responses = action.payload;
    },
    addResponse: (state, { payload: response }) => {
      const newResponse: any = {
        _id: new Date().getTime().toString(),
        user: response.user,
        quiz: response.quiz,
        grade: response.grade,
        attempts: response.attempts,
        time: response.time,
        questions: [],
      };
      state.responses = [...state.responses, newResponse] as any;
    },
    updateResponse: (state, { payload: response }) => {
      state.responses = state.responses.map((a: any) =>
        a._id === response._id ? response : a
      ) as any;
    },
  },
});
export const { setResponses, addResponse, updateResponse } =
  responsesSlice.actions;
export default responsesSlice.reducer;
