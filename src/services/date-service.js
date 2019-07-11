import * as moment from 'moment';

class DateService {

    getLocalDate(date) {
        moment.locale('fr');
        return moment(date).format('LL');
    }
}

export default new DateService();