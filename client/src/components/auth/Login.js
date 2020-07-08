import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [FormData, setFormData] = useState({
    password: '',

    email: ''
  });
  const { password, email } = FormData;

  const onChange = e =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const onSubmit =async e => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
   return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Log Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Do'nt have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
