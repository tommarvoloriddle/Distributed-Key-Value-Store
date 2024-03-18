import React from 'react';
import Slave from '../../components/slave/slave.jsx';
import {Button} from '@mui/material';
import {Card, CardHeader, CardContent} from '@mui/material'
import {KEYS, VALUES} from '../../data'
import { Grid, Box } from '@mui/material';

class SlaveContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // initialize state properties here
        noOfSlaves: 0,
        slaves: [],
        loadingSlaves: {},
        slaveData: {}
    };
  }

handleAddSlave() {
    const ADD_SLAVE_API = 'http://localhost:5000/api/addSlave';
    const SLAVE_API = 'http://localhost:5000/api/slave/data';

    fetch(ADD_SLAVE_API,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.slaves);
        this.setState({ noOfSlaves: data.slaves ? data.slaves.length : 1 });
        this.setState({ slaves: data.slaves });
        let loadingSlaves = {}
        let slaveData = {}
        data.slaves.forEach((slave) => {
            loadingSlaves[slave] = true    
            slaveData[slave]  = {}
        })
        this.setState({loadingSlaves : loadingSlaves})
        // fetch slave data loop through keys
        
        data.slaves.forEach((slave) => {
            fetch(`${SLAVE_API}?slaveId=${slave}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                slaveData[slave] = data.data
                loadingSlaves = this.state.loadingSlaves
                loadingSlaves[slave] = false
                this.setState({loadingSlaves : loadingSlaves})
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
        this.setState({slaveData : slaveData})
       
    });
}

handleRemoveSlave() {
    const DEL_SLAVE_API = 'http://localhost:5000/api/popSlave' + '?' + 'slaveId=' + 3;
    const SLAVE_API = 'http://localhost:5000/api/slave/data';

    fetch(DEL_SLAVE_API,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.slaves);
        this.setState({ noOfSlaves: data.slaves ? data.slaves.length : 1 });
        this.setState({ slaves: data.slaves });
        let loadingSlaves = {}
        let slaveData = {}
        data.slaves.forEach((slave) => {
            loadingSlaves[slave] = true    
            slaveData[slave]  = {}
        })
        this.setState({loadingSlaves : loadingSlaves})
        // fetch slave data loop through keys
        
        data.slaves.forEach((slave) => {
            fetch(`${SLAVE_API}?slaveId=${slave}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                slaveData[slave] = data.data
                loadingSlaves = this.state.loadingSlaves
                loadingSlaves[slave] = false
                this.setState({loadingSlaves : loadingSlaves})
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
        this.setState({slaveData : slaveData})
       
    });
}

handleAddData() {
    const ADD_DATA_API = 'http://localhost:5000/setkey';
    const SLAVE_API = 'http://localhost:5000/api/slave/data';
    
    fetch(ADD_DATA_API + '?' + 'key=' + KEYS[Math.floor(Math.random() * KEYS.length)] + '&value=' + VALUES[Math.floor(Math.random() * VALUES.length)], {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let slaveId = data.slaveId;
        let loadingSlaves = this.state.loadingSlaves;
        let slaveData = this.state.slaveData;
        loadingSlaves[slaveId] = true;
        this.setState({ loadingSlaves: loadingSlaves });
    
        fetch(`${SLAVE_API}?slaveId=${slaveId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            slaveData[slaveId] = data.data;
            loadingSlaves = this.state.loadingSlaves;
            loadingSlaves[slaveId] = false;
            this.setState({ loadingSlaves: loadingSlaves, slaveData: slaveData });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });    
}

componentDidMount() { 
    // fetch data here
    const API = 'http://localhost:5000/api/slaves';
    const SLAVE_API = 'http://localhost:5000/api/slave/data';
    try {
        fetch(API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.slaves);
            this.setState({ noOfSlaves: data.slaves ? data.slaves.length : 1 });
            this.setState({ slaves: data.slaves });
            let loadingSlaves = {}
            let slaveData = {}
            data.slaves.forEach((slave) => {
                loadingSlaves[slave] = true    
                slaveData[slave]  = {}
            })
            this.setState({loadingSlaves : loadingSlaves})
            // fetch slave data loop through keys
            
            data.slaves.forEach((slave) => {
                fetch(`${SLAVE_API}?slaveId=${slave}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    slaveData[slave] = data.data
                    loadingSlaves = this.state.loadingSlaves
                    loadingSlaves[slave] = false
                    this.setState({loadingSlaves : loadingSlaves})
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            });
            this.setState({slaveData : slaveData})
           
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ noOfSlaves: 0 });
        });
    } catch (error) {
        console.error('Caught an error during fetch:', error);
        this.setState({ noOfSlaves: 0 });
}


  }
  render() {
    return (
        <Box   
            my={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={2}
            sx={{ 
                border: '2px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Grid container spacing={4} alignItems="center" justify="center" direction='column'>
                <Grid item>
                    <Slave 
                        noOfSlaves={this.state.noOfSlaves} 
                        slaves={this.state.slaves} 
                        loadingSlaves={this.state.loadingSlaves} 
                        slaveData={this.state.slaveData}
                    />
                </Grid>
                <Grid item >
                    <Grid container spacing={2} alignItems="center" justify="center" direction='row'>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleAddData.bind(this)}
                            >
                                Add Data
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleAddSlave.bind(this)}
                            >
                                Add Slave
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleRemoveSlave.bind(this)}
                            >
                                Remove Slave
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
    
    
  }
}   

export default SlaveContainer;
