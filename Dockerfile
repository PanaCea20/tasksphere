# ===== Build =====
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -e -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -e -DskipTests package

# ===== Run =====
FROM eclipse-temurin:17-jre-alpine
ENV JAVA_OPTS=""
WORKDIR /app
COPY --from=build /app/target/tasksphere-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]
