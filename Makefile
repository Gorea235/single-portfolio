# Builds the angular webserver

BIN=./node_modules/.bin
OUT=dist/
NODE=node/base/
NODE_M=node_modules/
NODE_SRC=node/src/
NODE_SRC_CONF=$(NODE_SRC)tsconfig.node.json
ETC=etc/

all: build clean-etc

build: angular node
	cp -R $(NODE)* $(OUT)
	$(BIN)/tsc -p $(NODE_SRC_CONF)

base:
	npm install

angular: base
	$(BIN)/ng build -prod -op $(OUT)

node: base
	npm install --production --prefix $(NODE)

clean: clean-etc
	rm -Rf $(NODE_M) $(NODE)$(NODE_M)

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(OUT)$(ETC)
