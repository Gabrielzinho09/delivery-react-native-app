# App Delivery Ecommerce

# Tecnologías usadas
- Node.js
- Express
- MySQL
- React Native (Expo)

# Descripción

Aplicación móvil desarrollada con React Native y backend en Node.js con Express para gestión de rastreo en tiempo real, rutas, pasarelas de pagos con Stripe y almacenamiento en la nube.

Esta aplicación permite realizar el seguimiento en tiempo real desde un punto A hasta un punto B, integrando funcionalidades de pago con Stripe, API de mapas con Google Maps, trazado de rutas con Between API de Google, comunicación en tiempo real con WebSockets, y almacenamiento en Firebase.

Incluye gestión de pedidos, categorías y productos.

# Capturas de pantalla

Pasarela de pagos = (ExpCassV1/assets/visa.jpeg)
Mapa con ruta = (ExpCassV1/assets/trazado.jpeg)
Productos = (ExpCassV1/assets/meat.jpeg)

# Roles de usuario

1.Administrador  
2.Cliente  
3.Repartidor  


# Instalación

# Backend

1. Clonar el repositorio:
   
   git clone https://github.com/Gabrielzinho09/delivery-react-native-app.git
   cd delivery-react-native-app/backend
   
Instalar dependencias:

npm install

//Crear archivo .env con las variables de entorno necesarias
#SERVER
PORT=3000
HOST=192.168.100.10

#DATABASE
DATABASE_HOST=test
DATABASE_USER=test
DATABASE_PASS=test
DATABASE_NAME=test

#STRIPE

STRIPE_SECRET_KEY=sk_test_test

#JWT-SECRET

JWT_SECRET=test


#Google Cloud

GCLOUD_PROJECT_ID=test
GCLOUD_KEY_FILE=./test
GCLOUD_BUCKET_NAME=test

RUN BACKEND
npm start
cd ../frontend
Instalar dependencias:


npm install
Crear archivo .env o configurar variables de entorno para la app:


EXPO_GOOGLE_MAPS_API_KEY=test
EXPO_STRIPE_PUBLISHABLE_KEY=test

Ejecutar la app en modo desarrollo:

RUN FRONTEND
expo start

Contacto
email: kevinguaman@outlook.com
GitHub: https://github.com/Gabrielzinho09