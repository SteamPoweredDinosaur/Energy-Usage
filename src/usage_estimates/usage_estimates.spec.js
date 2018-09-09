import { DateTime } from 'luxon';
import meterReadingsAll from '../data/meterReadingsSample.json';
import { monthlyUsageEstimator } from './';

it('For the sample JSON where readings are provided at the end of the month taking the difference method should be roughly equivalent to interpolation', () => {
  const meterReadings = meterReadingsAll.electricity;
  const estimator = monthlyUsageEstimator(meterReadings);
  const energyReadingsUsingOldMethod = [];
  const energyReadingsUsingInterpolation = [];

  for (let i = 0; i < meterReadings.length - 2; i += 1) {
    energyReadingsUsingOldMethod.push(meterReadings[i + 1].cumulative - meterReadings[i].cumulative);
    energyReadingsUsingInterpolation.push(estimator(DateTime.fromISO(meterReadings[i + 1].readingDate)));
  }

  energyReadingsUsingInterpolation.forEach((readingUsingInterpolation, index) => {
    expect(Math.abs(readingUsingInterpolation - energyReadingsUsingOldMethod[index]) < 3.0).toBe(true);
  });
});
