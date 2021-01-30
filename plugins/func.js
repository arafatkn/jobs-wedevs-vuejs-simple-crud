const func = {
    sum: function(arr) {
        let total = 0;
        for (let key in arr) {
            total += parseInt(arr[key]);
        }
        return total;
    },

    sumBy: function(arr, key) {
        let total = 0;
        for (let x in arr) {
            total += parseInt(arr[x][key]);
        }
        return total;
    },

    sortBy: function(arr, key) {
        return arr.sort((a,b)=>a[key].localeCompare(b[key]))
    },

    only: function(obj, props) {
        let nobj = {};
        props.forEach(val => {
            nobj[val] = obj[val];
        });
        return nobj;
    },

    alert: function(text) {
        alert(text);
    },

    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    queryString: function(query) {
        return Object.keys(query).map(key => key + '=' + query[key]).join('&');
    },

    reset: function(obj) {
        for(let x in obj) {
            obj[x] = '';
        }
        return obj;
    },

    obj2formdata: function(obj) {
        let data = new FormData();
        for(let x in obj) {
            if(Array.isArray(obj[x])) {
                for(let y in obj[x]) {
                    data.append(x+'[]', obj[x][y]);
                }
            }
            else{
                data.append(x, obj[x]);
            }
        }
        return data;
    },

    errorsAsText: function(errors) {
        let etext = '';
        Object.values(errors).forEach(error => {
            error.forEach(text => (etext = etext + " " + text))
        })
        return etext;
    },
}
  
export default ({ app }, inject) => {
    inject('func', func)
}