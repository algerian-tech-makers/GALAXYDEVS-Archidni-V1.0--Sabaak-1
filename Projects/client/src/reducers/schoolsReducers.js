import {
  ALL_SCHOOLS_REQUEST,
  ALL_SCHOOLS_SUCCESS,
  ALL_SCHOOLS_FAIL,
  ADD_SCHOOL_REQUEST,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_FAIL,
  CLEAR_ERRORS,
  ADD_SCHOOL_RESET,
  SCHOOL_DETAIL_REQUEST,
  SCHOOL_DETAIL_SUCCESS,
  SCHOOL_DETAIL_FAIL,
  STUDENT_JOIN_REQUEST,
  STUDENT_JOIN_SUCCESS,
  STUDENT_JOIN_FAIL,
  ALL_SCHOOL_DEMAND_REQUEST,
  ALL_SCHOOL_DEMAND_SUCCESS,
  ALL_SCHOOL_DEMAND_FAIL,
  DELETE_SCHOOL_REQUEST,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_RESET,
  DELETE_SCHOOL_FAIL,
  DELETE_DEMAND_SCHOOL_REQUEST,
  DELETE_DEMAND_SCHOOL_SUCCESS,
  DELETE_DEMAND_SCHOOL_RESET,
  DELETE_DEMAND_SCHOOL_FAIL,
  NEW_SCHOOL_REQUEST,
  NEW_SCHOOL_SUCCESS,
  NEW_SCHOOL_RESET,
  NEW_SCHOOL_FAIL,
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_RESET,
  UPDATE_SCHOOL_FAIL,
} from "../constants/schoolsConstants";

export const schoolsReducer = (state = { schools: [] }, action) => {
  switch (action.type) {
    case ALL_SCHOOLS_REQUEST:
      return {
        loading: true,
        schools: [],
      };
    case ALL_SCHOOLS_SUCCESS:
      return {
        loading: false,
        schools: action.payload.schools,
        schoolsCount: action.payload.schoolsCount,
        resultParPage: action.payload.resultParPage,
        filteredSchoolsCount: action.payload.filteredSchoolsCount,
      };

    case ALL_SCHOOLS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const schoolsRequestsReducer = (state = { schools: [] }, action) => {
  switch (action.type) {
    case ALL_SCHOOL_DEMAND_REQUEST:
      return {
        loading: true,
        schools: [],
      };

    case ALL_SCHOOL_DEMAND_SUCCESS:
      return {
        loading: false,
        schools: action.payload.schools,
        schoolsCount: action.payload.schoolsCount,
        resultParPage: action.payload.resultParPage,
        filteredSchoolsCount: action.payload.filteredSchoolsCount,
      };
    case ALL_SCHOOL_DEMAND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newSchoolReducer = (state = { school: {} }, action) => {
  switch (action.type) {
    case ADD_SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SCHOOL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        school: action.payload.school,
      };
    case ADD_SCHOOL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_SCHOOL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const schoolDetailsReducer = (state = { school: {} }, action) => {
  switch (action.type) {
    case SCHOOL_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SCHOOL_DETAIL_SUCCESS:
      return {
        loading: false,
        school: action.payload,
      };
    case SCHOOL_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const schoolReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SCHOOL_REQUEST:
    case DELETE_DEMAND_SCHOOL_REQUEST:
    case UPDATE_SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SCHOOL_SUCCESS:
    case DELETE_DEMAND_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_SCHOOL_FAIL:
    case DELETE_DEMAND_SCHOOL_FAIL:
    case UPDATE_SCHOOL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SCHOOL_RESET:
    case DELETE_DEMAND_SCHOOL_RESET:
    case UPDATE_SCHOOL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addNewSchoolReducer = (state = { school: {} }, action) => {
  switch (action.type) {
    case NEW_SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_SCHOOL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        school: action.payload.product,
      };
    case NEW_SCHOOL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_SCHOOL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const studentsReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_JOIN_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case STUDENT_JOIN_SUCCESS:
      return {
        loading: false,
        student: action.payload,
      };
    case STUDENT_JOIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
