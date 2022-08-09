import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/login/Login';
import AddSchool from './pages/AddSchool';
import Apply from './pages/Apply';
import AddScool from './pages/AddSchool';
import ExploreSchools from './pages/ExploreSchools';
import SchoolDetails from './pages/schoolDetails/SchoolDetails';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import SchoolsList from './components/admin/SchoolsList';
import SchoolRequestList from './components/admin/SchoolRequestList';
import NewSchool from './components/admin/NewSchool';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import UsersList from './components/admin/UsersList';
import NewUser from './components/admin/NewUser';
import UpdateSchool from './components/admin/UpdateSchool';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addschool' element={<AddSchool />} />
        <Route path='/apply/:id' element={<Apply />} />
        {/* <Route path='/school' element={<School />} /> */}
        <Route path='/addschool' element={<AddScool />} />
        <Route path='/exploreSchools' element={<ExploreSchools />} />
        <Route path='/schoolDetails/:id' element={<SchoolDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route
            isAdmin={true}
            exact
            path='/dashboard'
            element={<Dashboard />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/schools'
            element={<SchoolsList />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/schools-requests'
            element={<SchoolRequestList />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/schools/create'
            element={<NewSchool />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/users'
            element={<UsersList />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/users/new'
            element={<NewUser />}
          />
          <Route
            isAdmin={true}
            exact
            path='/admin/school/:id'
            element={<UpdateSchool />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
