import axios from "axios";
import Config from 'react-native-config';

const jsonplaceholder = axios.create({
  baseURL: Config.API_URL,
});

export default jsonplaceholder;