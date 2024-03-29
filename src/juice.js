(function(){

var Juice = function(attributes){
        attributes || (attributes = {});
        //internal attributes
        var _attrs = {};
        //internal set function
        this._set = function(key, value){
            _attrs[key] = value;
        };
        //internal get function
        this._get = function(){
            return _attrs;
        };
        this._del = function(key) {
            delete _attrs[key];
        };
        this.init(attributes);
        return this;
    },
    _uniqId = (function(){
        var id = 1;
        return function(){ return id++; };
    })();

Juice.prototype = {
    init: function(attrs) {
        this.__id = _uniqId();
        /*
        * callback key object
        * { <key> : ['cbk_x', 'cbk_y']}
        */
        this._cbk = {};
        /*
        * callback object
        * { 'cbk_x' : fn}
        */
        this._callback = {};
        this.set(attrs);
    },
    set: function(attrs, options) {
        options || (options = {});
        var __cbk = [];
        for(var key in attrs) {
            var now = this.get(key);
            if(now === attrs[key]) {
                continue;
            }
            if(this._cbk[key]) {
                __cbk = __cbk.concat(this._cbk[key]);
            }
            this._set(key, attrs[key]);
        }
        //uniq _cbk
        if(__cbk.length > 0) {
            __cbk = this._uniqArray(__cbk);
            for(var i in __cbk) {
                this._callback[__cbk[i]].call();
                /*
                setTimeout((function(cb){
                    return function() {
                        //console.log('cbkk: ', i, __cbk[i], me._callback[__cbk[i]] + '');
                        cb();
                    }
                })(this._callback[__cbk[i]]), 0);
                */
            }
        }
    },
    del: function(key) {
        var _value = this.get(key);
        if(_value != undefined) {
            this._del(key);
        }
        //TODO: delete bind function
    },
    get: function(list) {
        var _attrs = this._get();
        if(!list)  {
            return _attrs;
        }
        if(typeof list == 'string') {
            return _attrs[list];
        }
        var i, obj = {};
        for(var i in list) {
            obj[list[i]] = _attrs[list[i]];
        }
        return obj;
    },
    bind: function(list, fn) {
        var fid = _uniqId(),
            cbk = 'cbk_' + fid,
            i, key;
        this._callback[cbk] = fn;
        //registe the fn to key
        for(i in list) {
            key = list[i];
            if(!this._cbk[key]) {
                this._cbk[key] = []
            }
            this._cbk[key].push(cbk);
        }
    },
    //underscore fn below here
    _uniqArray: function(arr) {
        arr.sort();
        var uniq_arr = [arr[0]];
        for(var i = 1;i < arr.length;i++) {
            if(arr[i] !== uniq_arr[uniq_arr.length-1]) {
                uniq_arr.push(arr[i]);
            }
        }
        return uniq_arr;
    }
};

    //export Juic to global
    this.Juice = Juice;
})(this);
