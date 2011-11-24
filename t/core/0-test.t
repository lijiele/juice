load('./t/util/lib.js');
//plan({noPlan:true});
plan({tests:12});
is(new juice() instanceof Object, true, 'contructor: empty');
is(new juice({}) instanceof Object, true, 'contructor: empty object');
var juice = new juice({key:'123'});
is(juice.__id, '3', 'id');
isDeeply(juice.get(['key']), {key:'123'}, 'get key');
juice.set({'key':345});
isDeeply(juice.get(['key']), {key:'345'}, 'get key 2');


var cb_value = 'new';
is(cb_value, 'new', 'cb_value set to new');
juice.bind(['key'], function(){cb_value = 'done';});
is(cb_value, 'new', 'cb_value after bind before set');

juice.set({'key':344});
isDeeply(juice.get(['key']), {key:'344'}, 'validate the key after bind');
is(cb_value, 'done', 'cb_value validate after bind and set: done');

cb_value = 'new again';
is(cb_value, 'new again', 'reset cb_value to \'new again\'');
juice.set({'key':344});
isDeeply(juice.get(['key']), {key:'344'}, 'get after set the same value');
is(cb_value, 'new again', 'cb_value validate after set the same value');

//print(juice._cbk.toSource());
//print(juice._callback.toSource());
//juice.set({'key':344});
