# README

## Descripción

Este repositorio contiene el proyecto que incluye una aplicación bautizada como GranadAccess, desarrollada por el equipo SambaDevs
para la asignatura Dirección y Gestión de Proyectos (DGP para los amigos) para la Universidad de Granada. Aquí encontrarás las
instrucciones detalladas para el despliegue y uso de la aplicación.

---

## Requisitos previos

Para lanzar la aplicación correctamente, asegúrate de tener instalados los siguientes elementos:

- **Node.js** (versión mínima recomendada)
- **npm** (instalado junto con Node.js)
- **Python** (con Pip para instalar paquetes)
- **Docker**

Además, es importante reseñar que hay que modificar el fichero `DGP/app/src/api/config.js` para cambiar el valor de `ipAddress`. Con el valor `localhost`, la app funcionará en el navegador haciendo uso del ordenador. En cambio, si quieres usar la app en un dispositivo móvil o tablet, es necesario colocar en la mencionada variable el valor de la IP de la red en la que estás conectado con el ordenador y el propio dispositivo móvil o tablet. Para conocer dicha IP, basta con ejecutar el comando (en sistemas Linux):

```bash
ifconfig
```

tras, lo cual, hay que identificar el dispositivo de red (por ejemplo, `wlp3s0`) y copiar la numeración de la derecha de la palabra `inet`, que es la IP de la red.

---

## Instrucciones de lanzamiento de la aplicación

### 1. Instalación de dependencias de la aplicación

1. Abre una terminal y navega al directorio `DGP/app`.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:
   ```bash
   npm install
   ```
3. En caso de que el paso anterior falle por cuestiones de dependencias obsoletas, ejecuta el siguiente comanda:
   ```bash
   npm install --legacy-peer-deps
   ```

### 2. Lanzar los contenedores Docker para la base de datos

1. Abre una terminal y navega al directorio `DGP/back-end/BD`.
2. Ejecuta el siguiente comando para iniciar los contenedores:
   ```bash
   docker-compose up
   ```
   Esto lanzará contenedores para la base de datos MySQL y phpMyAdmin, permitiéndote gestionar y consultar las tablas.

### 3. Crear la base de datos en local

1. Con el paso anterior realizado, abre una terminal y navega al directorio `DGP/back-end/BD`.
2. Ejecuta el siguiente comando para ejecutar el script que conforma la base de datos:
   ```bash
   mysql -u root -p -h 127.0.0.1 -P 3307 dgp < ./back-end/BD/backup.sql
   ```
3. Cuando se te solicite la contraseña, escribe "rootpassword".

### 4. Configuración y activación del entorno virtual de Python

1. Abre una terminal y navega al directorio `DGP/back-end/server`.
2. Sigue los pasos a continuación:

   #### Crear el entorno virtual de Python (solo la primera vez):

   - Ejecuta el script:
     ```bash
     ./setup_env.sh
     ```
     **O** ejecuta manualmente el comando (si el comando `python3` no funciona, usar `python` en su lugar):
     ```bash
     python3 -m venv venv
     ```

   #### Activar el entorno virtual de Python:

   - En Linux/macOS:
     ```bash
     source venv/bin/activate
     ```
   - En Windows:
     - Si usas CMD:
       ```cmd
       venv\Scripts\activate
       ```
     - Si usas PowerShell:
       ```powershell
       .\venv\Scripts\Activate.ps1
       ```

3. Ahora es necesario instalar las dependencias de paquetes que son usadas en el servidor. Para ello, en el directorio actual, ejecuta el siguiente comando:

   ```bash
   pip install -r requirements.txt
   ```

4. Una vez activado el entorno virtual, lanza el servidor con el siguiente comando:
   ```bash
   python3 app.py
   ```

### 5. Lanzar la aplicación

1. Abre una terminal y navega al directorio `DGP/app`.
2. Ejecuta el siguiente comando para iniciar la aplicación:
   ```bash
   npm start
   ```
3. Tras el inicio, puedes:
   - Escanear el código QR mostrado en la terminal con la aplicación "Expo Go" (disponible en dispositivos móviles).
   - Presionar la tecla `w` para abrir la aplicación en tu navegador predeterminado.

### 6. Usar la aplicación

1. Una vez lanzada, aparecerá la pantalla de inicio de sesión.
2. Consulta phpMyAdmin para verificar las credenciales de los usuarios disponibles:
   - Abre un navegador y accede a: [http://localhost:8080/](http://localhost:8080/)
   - Navega a la base de datos `dgp` para consultar el estado de las tablas y credenciales.
3. Nota: Para iniciar sesión como estudiante, utiliza las siguientes credenciales:
   - **Usuario:** Prueba TP
   - **Contraseña:** Siete pictogramas de la nube con la luna (el primer pictograma comenzando desde la parte superior izquierda).

---

## Notas adicionales

- Asegúrate de seguir los pasos en el orden indicado para evitar errores durante el despliegue.
- Si encuentras problemas, verifica que todas las dependencias estén correctamente instaladas y que los servicios de Docker estén corriendo.
