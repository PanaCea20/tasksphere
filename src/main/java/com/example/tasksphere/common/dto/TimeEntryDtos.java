package com.example.tasksphere.common.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public class TimeEntryDtos {
    public record Create(@NotNull Long taskId,
                         @NotNull OffsetDateTime startedAt,
                         @Min(1) int minutes,
                         String note) {}
    public record Update(@NotNull OffsetDateTime startedAt,
                         @Min(1) int minutes,
                         String note) {}
    public record View(Long id, Long taskId, Long userId, OffsetDateTime startedAt, int minutes, String note) {}
}

