import './summary.style.css'

import { DataTables } from 'material-ui-datatables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import { Button } from '@material-ui/core';

export const Summary = () => {
    const handleFilterValueChange = (value) => {
        // your filter logic
    }
    
    const handleSortOrderChange = (key, order) => {
        // your sort logic
    }
    
    
    const TABLE_COLUMNS = [
        {
            key: 'name',
            label: 'Nom module',
        }, {
            key: 'calories',
            label: 'Act.',
        },  {
            key: 'calories',
            label: 'Temp',
        }, {
            key: 'calories',
            label: 'Hum',
        }, {
            key: 'calories',
            label: 'CO',
        }, {
            key: 'calories',
            label: 'LPG',
        }, {
            key: 'calories',
            label: 'Autre',
        },
    ];
    
    const TABLE_DATA = [
        {
            name: 'Frozen yogurt',
            calories: '159',
            fat: '6.0',
            carbs: '24',
        }, {
            name: 'Ice cream sandwich',
            calories: '159',
            fat: '6.0',
            carbs: '24',
        },
    ];

    return (
        <div>
            <div className='summary-content'>
                <p className='summary-title'>Sommaire</p>
                <Button 
                    css='button'
                    color='primary'
                    variant='contained'
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
                        data={TABLE_DATA}
                        showCheckboxes={false}
                        onFilterValueChange={handleFilterValueChange}
                        onSortOrderChange={handleSortOrderChange}
                        showFooterToolbar={false}
                    />
                </MuiThemeProvider>
            </div>
        </div>
    );
}