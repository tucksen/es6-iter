MODULES = node_modules
TRACEUR = $(MODULES)/traceur/traceur

build: build-amd build-cjs build-system

build-amd: $(MODULES)
	$(TRACEUR) --modules=amd --dir src out/amd

build-cjs: $(MODULES)
	$(TRACEUR) --modules=commonjs --dir src out/cjs

build-system: $(MODULES) clean
	ln -s src es6-iter
	mkdir -p out/system
	cat build/system-template.js >> imports.js
	$(TRACEUR) --modules=register --script imports.js --out es6-iter.js
	mv es6-iter.js out/system
	rm -f imports.js es6-iter es6-iter.js

test:
	karma start --single-run
	git checkout -- test/.chrome-profile/Local\ State

clean:
	rm -f imports.js iter iter.js

$(MODULES):
	npm install

.PHONY: build test clean run
