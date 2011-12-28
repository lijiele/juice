.PHONY:test dist
test:
	/home/lz/perl/bin/prove -r --exec '/home/lz/spidermonkey/bin/js -f ' t/core
dist:
	if [ -d dist ]; then rm -R dist; fi
	mkdir -p dist
	bin/build-dist > dist/juice.js
