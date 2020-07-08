import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Addexperience } from '../../../actions/profile';
import { withRouter, Link } from 'react-router-dom';

const AddExperience = ({ Addexperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    title: '',
    from: '',
    to: '',
    current: '',
    description: ''
  });

  const { company, current, description, to, title,from, location } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDatadisabled, toggleData] = useState(false);
  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={e => {
          e.preventDefault();
          Addexperience(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            requiredvalue={company}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleData(!toDatadisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDatadisabled ? 'disabled' : ''}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={e => onChange(e)}
            cols='30'
            rows='5'
            placeholder='Job Description'
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { Addexperience })(withRouter(AddExperience));
