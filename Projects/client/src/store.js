import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducers";
import {
  newSchoolReducer,
  schoolDetailsReducer,
  schoolReducer,
  schoolsReducer,
  schoolsRequestsReducer,
  studentsReducer,
} from "./reducers/schoolsReducers";

const reducer = combineReducers({
  user: userReducer,
  allSchools: schoolsReducer,
  newSchoolReq: newSchoolReducer,
  schoolDetail: schoolDetailsReducer,
  stdReducer: studentsReducer,
  allUsers: allUsersReducer,
  schoolsReq: schoolsRequestsReducer,
  school: schoolReducer,
  newSchool: newSchoolReducer,
  profile: profileReducer,
});

const middlewear = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewear))
);
export default store;
