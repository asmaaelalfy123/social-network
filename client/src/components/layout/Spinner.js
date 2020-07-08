import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export const Spinner = () => {
  return (
    <Fragment>
      <img
        alt='Loading..'
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};
