import React from 'react';

const ReportDetails = ({ name, roles, avatarUrl, startDate, endDate }) => (
  <div>
    <img src={avatarUrl} width="30" style={{ borderRadius: '30px' }} />
    <h2>{name}</h2>
    { roles.length > 0 && <div>{roles.join(', ')}</div> }
    <span>{startDate} - {endDate}</span>
  </div>
);

export default ReportDetails;
