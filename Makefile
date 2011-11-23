.PHONY:test
test:
	/home/lz/perl/bin/prove -r --exec '/home/lz/spidermonkey/bin/js -f ' t/core
