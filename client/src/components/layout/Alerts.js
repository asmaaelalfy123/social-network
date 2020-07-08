import React from 'react';
import {connect}from 'react-redux'



const Alerts = ({alerts}) => {
 
  return (
   alerts!==null&&alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        <i className='fasfa-info-circle' />
        {alert.msg}
      </div>
    ))
  );
};
const mapStateToProps=state=>({
  alerts:state.alerts
})

export default connect(mapStateToProps) (Alerts);
