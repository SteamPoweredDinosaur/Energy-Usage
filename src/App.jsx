import React, { Fragment } from 'react';
import EnergyChart from './components/EnergyChart';
import MeterReadingTable from './components/MeterReadingTable';
import styled from 'styled-components';

export default class App extends React.Component {
  state = {
    meterReadings: null,
    errorFetchingMeterReadings: null,
  };

  async componentDidMount() {
    try {
      // Ideally there would be server side rendering so user doesn't have to wait for the inital readings to load
      const readingsRequest = await fetch(
        'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json',
      );

      if (readingsRequest.ok) {
        // There's a few other error conditions to think about here, for example if this is not valid JSON.
        const meterReadings = (await readingsRequest.json()).electricity;
        this.setState({
          meterReadings,
        });
      } else {
        this.setState({
          errorFetchingMeterReadings: { status: readingsRequest.status },
        });
      }
    } catch (e) {
      this.setState({
        errorFetchingMeterReadings: { error: e },
      });
    }
  }

  render() {
    const { meterReadings, errorFetchingMeterReadings } = this.state;

    // Would be good to add a 'Try Again' functionality here or some automatic retry
    // and some friendly error messages depending on request status
    if (errorFetchingMeterReadings) {
      return <p>Error Accessing Meter Readings</p>;
    }

    return (
      <AppContainer>
        {meterReadings ? (
          <Fragment>
            <EnergyChartSection>
              <h2>Energy Usage</h2>
              <EnergyChart meterReadings={meterReadings} />
            </EnergyChartSection>
            <MeterReadingTableSection>
              <h2>Meter Readings</h2>
              <MeterReadingTable meterReadings={meterReadings} />
            </MeterReadingTableSection>
          </Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: sans-serif;
`;

const EnergyChartSection = styled.section`
  min-width: 400px;
  min-height: 300px;
  flex: 2;
`;

const MeterReadingTableSection = styled.section`
  padding: 20px 50px;
  flex: 1;
`;
