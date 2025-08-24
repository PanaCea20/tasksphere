package com.example.tasksphere.common.mapper;

import com.example.tasksphere.common.dto.TimeEntryDtos;
import com.example.tasksphere.domain.TimeEntry;
import org.springframework.stereotype.Component;

@Component
public class TimeEntryMapper {
    public TimeEntryDtos.View toView(TimeEntry e) {
        Long taskId = e.getTask() != null ? e.getTask().getId() : null;
        Long userId = e.getUser() != null ? e.getUser().getId() : null;
        return new TimeEntryDtos.View(
                e.getId(),
                taskId,
                userId,
                e.getStartedAt(),
                e.getMinutes(),
                e.getNote()
        );
    }
}



