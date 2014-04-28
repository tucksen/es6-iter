MODULES = node_modules
TRACEUR = $(MODULES)/traceur/traceur

build: build-amd build-cjs build-system

build-amd: $(MODULES)
	$(TRACEUR) --modules=amd --dir src out/amd

build-cjs: $(MODULES)
	$(TRACEUR) --modules=commonjs --dir src out/cjs

build-system: $(MODULES) clean
	ln -s src iter
	mkdir -p out/system
	echo "import iter from './iter/iter';" >> imports.js
	$(TRACEUR) --modules=register --script imports.js --out iter.js
	mv iter.js out/system
	rm -f imports.js iter iter.js

test:
	karma start --single-run
	git checkout -- test/.chrome-profile/Local\ State

clean:
	rm -f imports.js iter iter.js

$(MODULES):
	npm install

.PHONY: build test clean run
