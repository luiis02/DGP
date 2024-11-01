# DGP

## Uso del repositorio 

1. Cada uno trabajamos en una rama de características basada en DEV, ya las he creado. --> git checkout DEV_"usuario"
2. Frecuentemente hacemos un "git pull" y hacemos revisiones de código para minimizar conflictos con archivos duplicados. 
3. Fusionamos las ramas de características en DEV mediante Pull Requests o mediante Merge, como prefiráis. 
4. Pruebas en DEV para asegurar estabilidad, estas pruebas deben de ser unitarias para la funcionalidad que hemos añadido.
5. Si las pruebas unitarias en DEV funcionan, pasamos a PRE mediante Pull Request o mediante Merge
6. En PRE, realizamos batería de test unitarios que comprueben toda la funcionalidad, y si no hay errores pasamos a PRO

## FAQ

### - ¿Cuántas ramas / qué ramas hay?
- git branch

### - ¿Cómo me muevo entre ramas?
- git checkout "rama"

### - Mostrar las diferencias entre la versión actual de stage y la última versión del archivo
- git diff --staged

### - Combinar la rama DEV_A con la rama B 
- Una vez estando en la rama A -> git checkout A
- Hacemos "git pull origin DEV_A" para asegurarnos de que tenemos la última versión de la rama DEV
- git checkout feature/login --> De esta forma creamos una "minirama" en la que sólo se trabajará con la funcionalidad de "login" (por ejemplo)
- Cuando hayamos completado el login -> git checkout DEV_A
- Finalmente, combinamos las ramas con " git merge feature/login "
- Añadimos a Github -> git push origin DEV_A

### - Cargar todos los commits de la rama local al GitHub
- git push

### - Descargar todo lo que hay en Github en el repositorio local
- git pull

### - Como ejecutar el docker
- En windows, descargar docker desktop y ejecutar "docker-compose up -d"
- En linux, "docker-compose up -d"
