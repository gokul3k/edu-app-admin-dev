import {
  GET_ALL_EXAMS,
  GET_EXAM_DETAIL,
  GET_EXAM_FAIL,
  GET_EXAM_INSTRUCTIONS,
  GET_EXAM_QUESTIONS,
  GET_EXAM_SUCCESS,
  GET_EXAM_REQUEST,
  PUBLISH_EXAM_FAIL,
  PUBLISH_EXAM_REQUEST,
  PUBLISH_EXAM_SUCCESS,
} from "../constants/examConstants";

const details = {
  title: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  duration: 20,
};
const instructions = [
  "Do not switch between tabs or windows when the test is on progress.",
  "Exam will be automatically submitted at the end of test duration."
];

function allExamsReducer(state = {loading:true,data:[]}, action) {
  switch (action.type) {
    case GET_ALL_EXAMS:
      return {loading:false,data:action.payload};
    default:
      return state;
  }
}

function examReducer(state = { loading:true,details:{},questions:[],instructions:[] }, action) {
  switch (action.type) {
    case GET_EXAM_REQUEST:
      return { loading: true, details:{},questions:[],instructions:[] };
    case GET_EXAM_SUCCESS:
      return {
        loading: false,
        details: action.details,
        questions: action.questions,
        instructions: action.instructions,
      };
    case GET_EXAM_FAIL:
      return { loading: false, details:{},questions:[],instructions:[] };
    default:
      return state;
  }
}
function examMarkListReducer(state={},action){
  switch (action.type){
    default:
       return state
  }
}
function publishExamReducer(
  state = { details: details, instructions: instructions, questions: [],counts:{} },
  action
) {
  switch (action.type) {
    case PUBLISH_EXAM_REQUEST:
      return {
        loading: true,
        questions: action.questions,
        instructions: action.instructions,
        details: action.details,
        counts:action.counts
      };
    case PUBLISH_EXAM_SUCCESS:
      return { loading: false, status: action.payload,complete:true };
    case PUBLISH_EXAM_FAIL:
      return { ...state, loading: false, status: action.payload };
    case GET_EXAM_DETAIL:
      return { ...state, details: action.details };
    case GET_EXAM_INSTRUCTIONS:
      return { ...state, instructions: action.instructions };
    case GET_EXAM_QUESTIONS:
      return { ...state, questions: action.questions, counts:action.counts };
    case "RESET_PUBLISH_EXAM":
      return { details: details, instructions: instructions, questions: [],counts:{} };
    default:
      return state;
  }
}

export { allExamsReducer, publishExamReducer, examReducer };
