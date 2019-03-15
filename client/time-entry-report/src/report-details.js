import React from 'react';
import { Heading, Paragraph } from '@contentful/forma-36-react-components';
import './ReportDetails.css';

const ReportDetails = ({ name, roles, avatarUrl, startDate, endDate }) => (
  <div className="report-details__container">
    <img src={avatarUrl} className="report-details__avatar" />
    <Heading>{name}</Heading>
    { roles.length > 0 && <Paragraph>{roles.join(', ')}</Paragraph> }
    <Paragraph>{startDate} - {endDate}</Paragraph>
  </div>
);

export default ReportDetails;
