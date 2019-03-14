import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@contentful/forma-36-react-components';

const formatDate = (dateISOstring) => new Date(dateISOstring).toLocaleString();

const EntryView = ({ data }) => (
  <div>
    <h3>Entry View</h3>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Entry</TableCell>
          <TableCell>When</TableCell>
          <TableCell>Duration (seconds)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ entryId, when, timeInSeconds }, idx) => (
          <TableRow key={idx}>
            <TableCell>{entryId}</TableCell>
            <TableCell>{formatDate(when)}</TableCell>
            <TableCell>{timeInSeconds}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default EntryView;
