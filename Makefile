update_mysql:
	docker compose -f docker-mysql/docker-compose.yml down -v
	docker compose -f docker-mysql/docker-compose.yml pull
	docker compose -f docker-mysql/docker-compose.yml up -d
start_mysql:	
	docker compose -f docker-mysql/docker-compose.yml up -d
stop_mysql:	
	docker compose -f docker-mysql/docker-compose.yml stop
remove_mysql: 
	docker compose -f docker-mysql/docker-compose.yml down -v
delete_images:
	rm -rf /home/ubuntu/repos/nexjs-openalpr/public/images/*.jpg