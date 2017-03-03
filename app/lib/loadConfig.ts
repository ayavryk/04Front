import {fGet} from '../lib/';
const config = {
    get: (name) =>  config[name] ? config[name] : console.log('not found config ' + name) && false,
    set: (name,value) =>  config[name] ? config[name] : console.log('not found config ' + name) && false
};

const loadConfig = (callback,path = '') => {

    if (path === '') {
        const route = location.hash.match(/^[^a-z]*([a-z]+)\/([a-z]+)\//);
        if (!route || route.length < 3) {
            console.log('ERROR in getConfig path parse');
            return false;
        }
        path = route[2] + '.' + route[1];
    }

    if (config[path]) {
        callback(this.config[path]);
        return true;
    }

    const success = (data) => {
        this.config[path] = data;
        callback(data);
    };

    fGet(`/config/${path}.json`, {
            success: success.bind(this),
            error: () => {
                console.log('err config load');
            }
        });
    return false;
};

export {config, loadConfig}
