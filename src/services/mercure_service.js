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

            eventSource.onopne = () => {
                resolve(true);
            }

            eventSource.onerror = () => {
                console.log('EventSource Failed: Notification');
                reject('EventSource Failed: Notification');
            };

            eventSource.onmessage = e => {
                var result = JSON.parse(e.data);
                callback(result);
            }
        }
        )};

}

export default new MercureService();