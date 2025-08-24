package com.example.tasksphere.config;

import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("tasksphere")
                .pathsToMatch("/api/**")
                .addOpenApiCustomizer(openApi -> openApi.setInfo(new Info().title("TaskSphere API").version("v1")))
                .build();
    }
}

