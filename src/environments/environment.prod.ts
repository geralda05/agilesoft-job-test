import {ENDPOINT} from './apis';

export const environment = {
  production: true,
  ...ENDPOINT('http://161.35.140.236:9005/api'),
};
