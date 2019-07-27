import { DEFALUT_URL_HUB } from '../actions/types';
import { EventSourcePolyfill } from 'event-source-polyfill';
import authService from './auth-service';

class MercureService {

    launchMercure(topic, callback) {
        return new Promise ((resolve, reject) => {
            const authorizationToken = authService.getToken('mercure_token');
            const url = new URL(`${DEFALUT_URL_HUB}/hub`);
            url.searchParams.append('topic', `${topic}`);

            const eventSource = new EventSourcePolyfill(url, {
                headers: {
                    'Authorization': 'Bearer ' + authorizationToken
                }
            });

            eventSource.onopen = () => {
                resolve(true);
            }

            eventSource.onerror = (err) => {
                console.log(err);
                reject('EventSource Failed: Notification');
            };

            eventSource.onmessage = e => {
                var result = JSON.parse(e.data);
                console.log(result);
                callback(result);
            }
        }
        )};

}

export default new MercureService();