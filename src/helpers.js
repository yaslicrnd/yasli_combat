export default {

    jsonToUrlEncode(params) {
        return Object.keys(params).reduce((acc, item, index) => {
            if(index != 0) acc += '&';
            return acc + item + '=' + params[item];
        }, '');
    }

    
};