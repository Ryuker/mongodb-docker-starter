# Local MongoDB CRUD Boilerplate notes


**login:** 
- ip adress: 172.22.0.2 
- username: mongo_admin
- password: example_pass

## To get IP adress:
``` Terminal
docker container ls 
```
    - gets all containers, copy the name of the database container
``` Terminal
docker inspect {dbname}
```
  - inspects the database container
  - copy the ip adress (it can differ per session)