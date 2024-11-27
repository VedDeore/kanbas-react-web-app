import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
  questions: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        description: quiz.description,
        quizType: quiz.quizType,
        points: quiz.points,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        multipleAttemptsCount: quiz.multipleAttemptsCount,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionAfterAnswering: quiz.lockQuestionAfterAnswering,
        dueDate: quiz.dueDate,
        availableFrom: quiz.availableFrom,
        availableUntil: quiz.availableUntil,
        course: quiz.course,
        numberOfQuestions: quiz.numberOfQuestions,
        published: quiz.published,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        _id: new Date().getTime().toString(),
        type: question.type,
        title: question.title,
        points: question.points,
        description: question.description,
        choices: question.choices || [],
        correct: question.correct,
        quizId: question.quizId,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (a: any) => a._id !== questionId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((a: any) =>
        a._id === question._id ? question : a
      ) as any;
    },
  },
});
export const {
  setQuizzes,
  setQuestions,
  addQuiz,
  addQuestion,
  deleteQuiz,
  deleteQuestion,
  updateQuiz,
  updateQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
