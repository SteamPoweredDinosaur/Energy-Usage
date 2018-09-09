import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DateTime } from 'luxon';
import { monthlyUsageEstimator } from '../usage_estimates';

export default ({ meterReadings }) => {
  const estimator = monthlyUsageEstimator(meterReadings);

  const energyUsageData = [];
  for (let i = 0; i < meterReadings.length - 2; i++) {
    const date = DateTime.fromISO(meterReadings[i + 1].readingDate);

    energyUsageData.push({
      date: DateTime.fromISO(meterReadings[i + 1].readingDate).toFormat('LLL'),
      energyUsage: estimator(date),
    });
  }
  return (
    <ResponsiveContainer height="90%" width="100%" minHeight="100px">
      <BarChart data={energyUsageData}>
        <XAxis dataKey="date" />
        <YAxis dataKey="energyUsage" />
        <CartesianGrid horizontal={false} />
        <Tooltip />
        <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
