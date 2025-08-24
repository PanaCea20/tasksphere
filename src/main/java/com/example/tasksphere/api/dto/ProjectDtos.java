package com.example.tasksphere.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public class ProjectDtos {
    @Schema(name = "ProjectCreate")
    public record Create(@NotBlank String name, String description) {}
    @Schema(name = "ProjectView")
    public record View(Long id, String name, String description, Long ownerId) {}
}


