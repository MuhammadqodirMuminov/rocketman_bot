import axios from 'axios';
import { base_api } from './bot.config';

axios.defaults.baseURL = base_api;

export default axios;
