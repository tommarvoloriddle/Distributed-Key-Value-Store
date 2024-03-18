import React from 'react';
import { Grid } from '@mui/material';
import SlaveCard from '../slaveCard/slaveCard';

import {Card, CardHeader, CardContent} from '@mui/material'
class Slave extends React.Component {
  constructor(props) {
    super(props);
    console.log("Slave props: ", props);
    this.state = {
      // initialize state properties here
    };
  }

  render() {

    return (
      <Grid container spacing={3} >
        {
          this.props.slaves.map((slaveId, index) => {
            return (  
              <Grid item xs={4} key={index}   >

                    <SlaveCard key={slaveId} slaveId={slaveId} loading={this.props.loadingSlaves[slaveId]} data = {this.props.slaveData[slaveId]} />

              </Grid>
            );
          })
        }
      </Grid>
    );
  }
}

export default Slave;
