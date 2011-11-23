load('./t/util/lib.js');
//plan({noPlan:true});
plan({tests:12});
is(new JSVMS() instanceof Object, true, 'contructor: empty');
is(new JSVMS({}) instanceof Object, true, 'contructor: empty object');
var jsvms = new JSVMS({key:'123'});
is(jsvms.__id, '3', 'id');
isDeeply(jsvms.get(['key']), {key:'123'}, 'get key');
jsvms.set({'key':345});
isDeeply(jsvms.get(['key']), {key:'345'}, 'get key 2');


var cb_value = 'new';
is(cb_value, 'new', 'cb_value set to new');
jsvms.bind(['key'], function(){cb_value = 'done';});
is(cb_value, 'new', 'cb_value after bind before set');

jsvms.set({'key':344});
isDeeply(jsvms.get(['key']), {key:'344'}, 'validate the key after bind');
is(cb_value, 'done', 'cb_value validate after bind and set: done');

cb_value = 'new again';
is(cb_value, 'new again', 'reset cb_value to \'new again\'');
jsvms.set({'key':344});
isDeeply(jsvms.get(['key']), {key:'344'}, 'get after set the same value');
is(cb_value, 'new again', 'cb_value validate after set the same value');

//print(jsvms._cbk.toSource());
//print(jsvms._callback.toSource());
//jsvms.set({'key':344});
