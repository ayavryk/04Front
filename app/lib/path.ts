

const getRoute = () => {
    const path = location.hash.match(/^[^a-z]*([a-z]+)\/([a-z]+)\/*([0-9]*)/);
    if (!path || path.length < 4) {
        console.log('ERROR in getConfig path parse');
        return null;
    }
    return   {
        id: path[3] === '' ? 0 : parseInt(path[3],10),
        controller: path[1],
        method: path[2],
        hash: path[1] + '/' + path[2]
    };


};

export default getRoute;
