package com.example.tasksphere.it;

import com.example.tasksphere.TaskSphereApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = TaskSphereApplication.class,
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class ProjectControllerIT {

    @Container
    static PostgreSQLContainer<?> pg = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("tasksphere").withUsername("tasksphere").withPassword("tasksphere");

    @DynamicPropertySource
    static void db(DynamicPropertyRegistry r) {
        r.add("spring.datasource.url", pg::getJdbcUrl);
        r.add("spring.datasource.username", pg::getUsername);
        r.add("spring.datasource.password", pg::getPassword);
    }

    @Autowired TestRestTemplate rest;

    @Test
    void registerLoginAndCreateProject() {
        var reg = rest.postForEntity("/api/auth/register", Map.of(
                "email","u@e.com","fullName","User Example","password","secret123!"), Map.class);
        assertThat(reg.getStatusCode()).isEqualTo(HttpStatus.OK);
        String token = (String) reg.getBody().get("token");

        HttpHeaders h = new HttpHeaders();
        h.setBearerAuth(token);
        h.setContentType(MediaType.APPLICATION_JSON);

        var resp = rest.exchange("/api/projects", HttpMethod.POST,
                new HttpEntity<>(Map.of("name","My Project","description","Test"), h), Map.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody().get("name")).isEqualTo("My Project");
    }
}

