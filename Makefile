# Builds the angular webserver

OUT=dist/
NODE=node/
NODE_M=node_modules/
ETC=etc/

all: build clean-etc

build: angular node
	cp -R $(NODE)* $(OUT)

angular:
	npm install
	ng build -prod -op $(OUT)

node:
	npm install --prefix $(NODE)

clean: clean-etc
	rm -Rf $(NODE_M) $(NODE)$(NODE_M)

clean-etc:
	rm -Rf $(ETC) $(NODE)$(ETC) $(OUT)$(ETC)
