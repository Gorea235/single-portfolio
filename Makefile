# Builds the angular webserver

# env locations
BIN?=./node_modules/.bin
PKG?=package.json
LOCK?=yarn.lock
ETC?=etc/

# node locations
NODE?=node/
NODE_M?=node_modules/
NODE_CONF?=$(NODE)tsconfig.node.json

# output locations
DIST?=dist/
OUT?=build/
NG_OUT?=$(OUT)ng/
NODE_OUT?=$(OUT)node/
FULL_OUT?=$(OUT)out/
FULL_OUT_NG?=$(FULL_OUT)content/

# full build
release: ng-prep node-prep release-build

release-build: ng node clean merge

# debug node build
debug: node

docker:
	docker build -t gorea235/single-portfolio .

# build prep
prep:
	yarn

ng-prep: prep
	mkdir -p $(NG_OUT)

# node prerequisite task
node-prep: prep
	yarn --cwd $(NODE)
	mkdir -p $(NODE_OUT)
	cp -f $(NODE)$(PKG) $(NODE_OUT)$(PKG)
	cp -f $(NODE)$(LOCK) $(NODE_OUT)$(LOCK)
	yarn --prod --cwd $(NODE_OUT)

# angular
ng:
	$(BIN)/ng build --aot --prod --output-path $(NG_OUT)

.PHONY: node
node:
	mkdir -p $(NODE_OUT)
	$(BIN)/tsc -p $(NODE_CONF) --outDir $(NODE_OUT)

merge:
	mkdir -p $(FULL_OUT)
	mkdir -p $(FULL_OUT_NG)
	cp -Rf $(NODE_OUT)* $(FULL_OUT)
	cp -Rf $(NG_OUT)* $(FULL_OUT_NG)

clear: clean
	rm -Rf $(OUT) $(DIST)

clean: clean-etc

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(NG_OUT)$(ETC) $(NODE_OUT)$(ETC)
