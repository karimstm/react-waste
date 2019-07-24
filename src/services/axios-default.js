import axios from 'axios';
import { DEFALUT_URL } from '../actions/types';

export default axios.create({
    baseURL: DEFALUT_URL
});