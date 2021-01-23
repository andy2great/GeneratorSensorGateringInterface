
import React, { useState, useEffect } from 'react';

import { DataTables } from 'material-ui-datatables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';
import summaryService from './summary.service';
import { SENSEURS_TYPE } from '../../constants/senseurs.constants';

import './summary.style.css';

export const Summary = (props) => {
    const [tableData, setTableData] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log('tests')
        refreshData();
    }, []);

    const refreshData = () => {
        summaryService.getLastValue()
            .then(res => {
                const rows = [];
                const locations = new Set(res.map(data => {
                    return data.location;
                }));
                
                locations.forEach(location => {
                    const row = {
                        location: location,
                        modeOpr: NaN,
                        temp: NaN,
                        hum: NaN,
                        co: NaN,
                        lpg: NaN,
                        autre: true,
                        temps: NaN,
                    }

                    const senseurs = res.filter(x => {
                        return x.location === location;
                    });

                    senseurs.forEach(x => {
                        const time = new Date(x.timestamp);
                        row.temps = !row.temps && `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
                        switch(x.senseur) {
                            case SENSEURS_TYPE.MOD_PERATION:
                                row.modeOpr = x.val;
                                break;
                            case SENSEURS_TYPE.TEMPERATURE:
                                row.temp = x.val;
                                break;
                            case SENSEURS_TYPE.HUMIDITE:
                                row.hum = x.val;
                                break;
                            case SENSEURS_TYPE.CO:
                                row.co = x.val;
                                break;
                            case SENSEURS_TYPE.LPG:
                                row.lpg = x.val;
                                break;
                            default:
                                row.autre = true;
                        }
                    });
                    
                    rows.push(row);
                })
                setTableData(rows);
            });
    } 

    const handleCellClick = (row, column, event) => {
        if (column === 0) {
            props.handler(event)
        }
    }

    
    const TABLE_COLUMNS = [
        {
            key: 'location',
            label: 'Module',
        }, {
            key: 'modeOpr',
            label: 'Act.',
        },  {
            key: 'temp',
            label: 'Temp',
        }, {
            key: 'hum',
            label: 'Hum',
        }, {
            key: 'co',
            label: 'CO',
        }, {
            key: 'lpg',
            label: 'LPG',
        }, {
            key: 'autre',
            label: 'Autre',
        }, {
            key: 'temps',
            label: 'Temps',
        }
    ];

    return (
        <div className='summary-content'>
            <p className='summary-title'>Sommaire</p>
            <Button 
                css='button'
                color='primary'
                variant='contained'
                onClick={() => refreshData()}
            >
                Rafraichir
            </Button>
            <MuiThemeProvider>
                <DataTables
                    height={'auto'}
                    tableStyle={{width: '90%', }}
                    selectable={false}
                    showRowHover={true}
                    columns={TABLE_COLUMNS}
                    data={tableData}
                    showCheckboxes={false}
                    onCellClick={handleCellClick}
                    showFooterToolbar={false}
                />
            </MuiThemeProvider>
        </div>
    );
}