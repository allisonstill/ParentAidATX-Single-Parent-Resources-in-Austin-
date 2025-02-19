MAIN_BRANCH := main

install:
	npm install

run:
	npm run dev

pull:
	git pull origin $(MAIN_BRANCH)

push:
	git push origin $(MAIN_BRANCH)