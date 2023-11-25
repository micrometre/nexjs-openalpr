.PHONY: run

clean:
	rm -rf public/images
	mkdir public/images
	rm sqlite-data/collection.db

start:
	docker-compose down -v
	docker-compose pull
	docker-compose up -d --build
remove:
	docker-compose down -v
	docker-compose rm -f	