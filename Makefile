# Builds the angular webserver

BIN=./node_modules/.bin
OUT=dist/
NODE=node/base/
NODE_M=node_modules/
NODE_SRC=node/src/
NODE_SRC_CONF=$(NODE_SRC)tsconfig.node.json
ETC=etc/

# full build
build: angular node

# npm prerequisite task
npm-pre:
	npm install

# node prerequisite task
node-pre: npm-pre
	npm install --production --prefix $(NODE)

# angular
angular: npm-pre
	$(BIN)/ng build -prod -op $(OUT)

node: node-pre
	test -d $(OUT) || mkdir $(OUT)
	cp -R $(NODE)* $(OUT)
	$(BIN)/tsc -p $(NODE_SRC_CONF)

clean: clean-etc
	rm -Rf $(NODE_M) $(NODE)$(NODE_M)

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(OUT)$(ETC)
