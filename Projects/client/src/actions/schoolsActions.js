import {
  ALL_SCHOOLS_REQUEST,
  ALL_SCHOOLS_SUCCESS,
  ALL_SCHOOLS_FAIL,
  ADD_SCHOOL_REQUEST,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_FAIL,
  CLEAR_ERRORS,
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
  DELETE_SCHOOL_FAIL,
  DELETE_DEMAND_SCHOOL_REQUEST,
  DELETE_DEMAND_SCHOOL_SUCCESS,
  DELETE_DEMAND_SCHOOL_FAIL,
  NEW_SCHOOL_REQUEST,
  NEW_SCHOOL_SUCCESS,
  NEW_SCHOOL_FAIL,
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAIL,
} from "../constants/schoolsConstants";
import axios from "axios";

// ?keyword=${keyword}&page=${currentPage}&type=${type}

export const getSchools =
  (keyword = "", currentPage = 1, type = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_SCHOOLS_REQUEST,
      });
      let link = `/api/schools`;
      const { data } = await axios.get(link);
      // console.log(data);
      dispatch({
        type: ALL_SCHOOLS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SCHOOLS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSchoolsRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_SCHOOL_DEMAND_REQUEST,
    });
    // let link = `/api/school-demands`;
    const { data } = await axios.get(`/api/school-demands`);
    console.log(data);
    dispatch({
      type: ALL_SCHOOL_DEMAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCHOOL_DEMAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create school req
export const createSchoolReq = (schoolData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SCHOOL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/school-demand/new`,
      schoolData,
      config
    );

    dispatch({
      type: ADD_SCHOOL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get school Details
export const getSchoolDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_DETAIL_REQUEST,
    });
    const { data } = await axios.get(`/api/schools/${id}`);
    dispatch({
      type: SCHOOL_DETAIL_SUCCESS,
      payload: data.school,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW Student Request
export const newStdReq = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_JOIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/student-request/new`,
      reviewData,
      config
    );

    dispatch({
      type: STUDENT_JOIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_JOIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete school
export const deleteSchool = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SCHOOL_REQUEST });

    const { data } = await axios.delete(`/api/admin/schools/${id}`);

    dispatch({
      type: DELETE_SCHOOL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete school Reuest
export const deleteSchoolRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DEMAND_SCHOOL_REQUEST });

    const { data } = await axios.delete(`/api/school-demands/${id}`);

    dispatch({
      type: DELETE_DEMAND_SCHOOL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEMAND_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create New School
export const createNewSchool = (schoolData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SCHOOL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/schools/new`, schoolData, config);

    console.log(data);

    dispatch({
      type: NEW_SCHOOL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update SCHOOL
export const updateSchool = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SCHOOL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/admin/schools/${id}`, {
      productData,
      config,
    });

    dispatch({
      type: UPDATE_SCHOOL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SCHOOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing Errors
export const clearEroors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
