# Usar una imagen de Java con Maven preinstalado
FROM maven:3.8.8-eclipse-temurin-17 AS build

# Establecer el directorio de trabajo correcto (donde está el pom.xml)
WORKDIR /app/backend/backend

# Copiar los archivos del proyecto al contenedor
COPY backend/backend .

# Construir el proyecto usando Maven
RUN mvn clean install

# Usar una imagen ligera de Java para correr la app
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el JAR generado desde la imagen de construcción
COPY --from=build /app/backend/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto que usará la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
