import React from 'react'
import {Route,Switch}from 'react-router-dom'




//profile
import DashboardProfile from '../components/profile/DashboardProfile';
import CreateProfile from '../components/profile/profile-forms/CreateProfile';
import EditProfile from '../components/profile/profile-forms/EditProfile';
import AddExperience from '../components/profile/profile-forms/AddExperience';
import AddEducation from '../components/profile/profile-forms/AddEducation';

//auth
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

//Alerts
import Alerts from '../components/layout/Alerts';

//profile
import Profiles from '../components/profiles/Profiles';
import UserProfile from '../components/userprofile/UserProfile';

//posts
import Posts from '../components/posts/Posts';

//post
import Post from '../components/post/Post'

//PrivateRoute
import PrivateRoute from './PrivateRoute';

//not found Page
import NotFound from '../components/layout/NotFound'
const Routes = () => {
    return (
        <section className='container'>
        <Alerts />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={UserProfile} />
          <PrivateRoute
            exact
            path='/dashboard'
            component={DashboardProfile}
          />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute
            exact
            path='/edit-profile'
            component={EditProfile}
          />
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
          <PrivateRoute
            exact
            path='/add-education'
            component={AddEducation}
          />

          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/posts/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
        
      </section>
    )
}

export default Routes
