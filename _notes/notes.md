# Local MongoDB CRUD Boilerplate notes

TODO:
1. [] modify Users controller to use mongoose functions instead
2. [] test db connection from dbService by runnings server
3. [] test controller functionality


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