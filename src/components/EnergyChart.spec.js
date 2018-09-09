import React from 'react';
import { shallow } from 'enzyme';
import meterReadings from '../data/meterReadingsSample.json';
import EnergyChart from './EnergyChart';

const setup = (props, render = shallow) => ({ instance: render(<EnergyChart {...props} />), props });

it('renders', () => {
  const { instance } = setup({ meterReadings: meterReadings.electricity });
  expect(instance).toMatchSnapshot();
});
