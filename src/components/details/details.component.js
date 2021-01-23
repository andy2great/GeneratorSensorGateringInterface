import './details.style.css';

import { Button } from '@material-ui/core';

export const Details = (props) => {

    return (
        <div className='parent'>
            <Button 
                css='button'
                color='primary'
                variant='contained'
                onClick={() => props.handler(null)}
            >
                Retour
            </Button>
            allo papa
            <div className='enfant'>
                comment ca va
            </div>
        </div>
    )
}