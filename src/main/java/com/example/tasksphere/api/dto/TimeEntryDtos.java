package com.example.tasksphere.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public class TimeEntryDtos {
    @Schema(name = "TimeEntryCreate")
    public record Create(
            @NotNull Long taskId,
            @NotNull Long userId,
            @NotNull Instant startedAt,
            @NotNull Integer minutes,
            String note
    ) {}
    @Schema(name = "TimeEntryView")
    public record View(Long id, Long taskId, Long userId, Instant startedAt, Integer minutes, String note) {}
}

