import React from 'react';
import { shallow } from 'enzyme';
import meterReadings from '../data/meterReadingsSample.json';
import MeterReadingTable from './MeterReadingTable';

const setup = (props, render = shallow) => ({ instance: render(<MeterReadingTable {...props} />), props });

it('renders', () => {
  const { instance } = setup({ meterReadings: meterReadings.electricity });
  expect(instance).toMatchSnapshot();
});
