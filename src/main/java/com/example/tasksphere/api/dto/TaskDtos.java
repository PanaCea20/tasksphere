package com.example.tasksphere.api.dto;


import com.example.tasksphere.domain.TaskStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class TaskDtos {
    @Schema(name = "TaskCreate")   // 👈 unique schema id in Swagger
    public record Create(
            @NotNull Long projectId,
            @NotBlank String title,
            @NotNull TaskStatus status,
            LocalDate dueDate
    ) {}

    @Schema(name = "TaskView")
    public record View(
            Long id,
            Long projectId,
            String title,
            TaskStatus status,
            LocalDate dueDate
    ) {}
}

