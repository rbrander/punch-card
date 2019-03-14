import React from 'react';

const ReportDetails = ({ name, startDate, endDate }) => (
  <div>
    <h2>{name}</h2>
    <span>{startDate} - {endDate}</span>
  </div>
);

export default ReportDetails;
