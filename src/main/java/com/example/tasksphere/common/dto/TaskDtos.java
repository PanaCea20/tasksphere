package com.example.tasksphere.common.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class TaskDtos {
    public record Create(@NotNull Long projectId,
                         @NotBlank @Size(max=200) String title,
                         @Size(max=30) String status,
                         LocalDate dueDate) {}
    public record Update(@NotBlank @Size(max=200) String title,
                         @Size(max=30) String status,
                         LocalDate dueDate) {}
    public record View(Long id, Long projectId, String title, String status, LocalDate dueDate) {}
}

