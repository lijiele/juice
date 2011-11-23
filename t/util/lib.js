//load test lib before load env
load('./t/util/Test.Simple-0.29/lib/Test/Builder.js');
load('./t/util/Test.Simple-0.29/lib/Test/Simple.js');
load('./t/util/Test.Simple-0.29/lib/Test/More.js');

/*
Packages.org.mozilla.javascript.Context.
     getCurrentContext().setOptimizationLevel(-1);
load('./t/util/envjs/env.rhino.1.2.js');
*/
load('./t/util/envjs/env.spidermonkey.js');
window.location = 'index.html';

load('./src/jsvms.js');
