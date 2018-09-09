import interpolator from 'natural-spline-interpolator';
import { DateTime } from 'luxon';

// Here for each reading date we calculate a dayCount which is days since the first reading,
// this means we can use the interpolator library to estimate the meter reading
// for an arbitary day.
// We then use this to estimate meter reading at the start and end of the month so we can calculate that months usage.
export const monthlyUsageEstimator = (electricReadings) => {
  const firstDate = DateTime.fromISO(electricReadings[0].readingDate);

  const readingsWithDayCount = electricReadings.map((reading) => {
    const readingDate = DateTime.fromISO(reading.readingDate);
    return {
      ...reading,
      dayCount: readingDate.diff(firstDate).as('days'),
    };
  });

  const dayWithReadingPairs = readingsWithDayCount.map(reading => [
    reading.dayCount,
    reading.cumulative,
  ]);

  const estimatorFunction = interpolator(dayWithReadingPairs);

  return (dateInMonth) => {
    const startOfMonth = dateInMonth.startOf('month');
    const endOfMonth = dateInMonth.endOf('month');
    const startOfMonthDayCount = startOfMonth.diff(firstDate).as('days');
    const endOfMonthDayCount = endOfMonth.diff(firstDate).as('days');
    const startOfMonthEstimate = estimatorFunction(startOfMonthDayCount);
    const endOfMonthEstimate = estimatorFunction(endOfMonthDayCount);
    return endOfMonthEstimate - startOfMonthEstimate;
  };
};
