import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Addeducation } from '../../../actions/profile';
import { withRouter, Link } from 'react-router-dom';

const AddEducation = ({ Addeducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: '',
    description: ''
  });

  const { degree, current, description, to, school,from, fieldofstudy } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDatadisabled, toggleData] = useState(false);
  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any school or bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={e => {
          e.preventDefault();
          Addeducation(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            value={school}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required value={degree}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
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
            Current School
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
            placeholder='Program Description'
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

export default connect(null, { Addeducation })(withRouter(AddEducation));

