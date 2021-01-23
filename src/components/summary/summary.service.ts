import { SERVER_NAME } from '../../constants/server.constants';

const summaryService = {
    getLastValue: () => {
        return fetch(SERVER_NAME + '/senseurs/last')
            .then(res => res.json());
    }
}

export default summaryService;