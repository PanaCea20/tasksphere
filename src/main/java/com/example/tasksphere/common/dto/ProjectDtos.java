package com.example.tasksphere.common.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDtos {
    public record Create(@NotBlank @Size(max=200) String name,
                         @Size(max=10_000) String description) {}
    public record Update(@NotBlank @Size(max=200) String name,
                         @Size(max=10_000) String description) {}
    public record View(Long id, String name, String description, String ownerName) {}
}

