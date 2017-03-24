import { fGet } from '../lib/';
declare var configPath: any;

const config: any = {};
const appConfigLoad = callback => {
    const success = data => {
        this.config = data;
        callback(data);
    };
    return fGet(configPath, {
        success: success.bind(this),
        error: () => {
            alert('err config load');
        }
    });
};

export { config, appConfigLoad }