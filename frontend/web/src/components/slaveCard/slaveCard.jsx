import React from 'react';
// import './slaveCard.css';

import { Container, Typography } from '@mui/material';
import {Card, CardHeader, CardContent} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

class SlaveCard extends React.Component  {   
    render() {
        const {slaveId} = this.props ? this.props : 99;
        const columns = [
            { field: 'key', headerName: 'key', width: 200 },
            { field: 'value', headerName: 'Value', width: 100 } 
          ];
          
        let rows = Object.entries(this.props.data).map(([key, value]) => ({
            id: key,
            key: key,
            value: value
        }));
        return (
            <Grid  container justifyContent="center" alignItems="center" direction='column'> 
                    <Card style={{ height: '100%', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Slave {slaveId}
                            </Typography>
                            {this.props.loading ? 
                                <CircularProgress style={{ margin: '20px auto', display: 'block' }} /> : 
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                />
                            }
                        </CardContent>
                    </Card>

            </Grid>

        );
    }
}

export default SlaveCard;

