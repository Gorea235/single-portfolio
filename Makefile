# Builds the angular webserver

BIN=./node_modules/.bin
OUT=dist/
NODE=node/
NODE_M=node_modules/
NODE_CONF=$(NODE)tsconfig.node.json
PKG=package.json
PKG_LOCK=package-lock.json
ETC=etc/

# full build
build: angular node

# npm prerequisite task
npm-pre:
	npm install

# node prerequisite task
node-pre: npm-pre
	cp $(NODE)$(PKG) $(OUT)$(PKG)
	cp $(NODE)$(PKG_LOCK) $(OUT)$(PKG_LOCK)
	npm install --production --prefix $(OUT)

# angular
angular: npm-pre
	$(BIN)/ng build -prod -op $(OUT)

node: node-pre
	mkdir -p $(OUT)
	$(BIN)/tsc -p $(NODE_CONF)

clean: clean-etc

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(OUT)$(ETC)
