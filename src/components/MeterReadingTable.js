import React from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';

export default ({ meterReadings }) => (
  <Table>
    <tbody>
      <tr>
        <Th>Date</Th>
        <Th>Reading</Th>
        <Th>Unit</Th>
      </tr>
      {meterReadings.map(reading => (
        <tr key={reading.readingDate}>
          <td>{DateTime.fromISO(reading.readingDate).toLocaleString()}</td>
          <td>{reading.cumulative}</td>
          <td>{reading.unit}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th`
  text-align: left;
`;
