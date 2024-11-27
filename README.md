### DGP
## Comando para iniciar el docker (en BD) 
```bash
  docker-compose up
```
## Comando para iniciar la API (en Server) Leer documento Comando_Activar_Entorno_Virtual si da problemas a la hora de lanzar la API 
```bash
  python app.py
```


## Comando para iniciar el servidor de react-native (Hay que estar dentro del directorio app)
```bash
  npm start
```

1.- npm install en app
2.- docker-compose up en BD
3.- mysql -u root -p -h 127.0.0.1 -P 3307 dgp <./backup.sql en BD
4.- python app.py en server
5.- ifconfig y ver la direccion ip de wlpIs0 y meterla en app/src/api