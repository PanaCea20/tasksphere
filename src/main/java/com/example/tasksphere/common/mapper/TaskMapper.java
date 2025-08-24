package com.example.tasksphere.common.mapper;

import com.example.tasksphere.common.dto.TaskDtos;
import com.example.tasksphere.domain.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public TaskDtos.View toView(Task e) {
        Long projectId = e.getProject() != null ? e.getProject().getId() : null;
        return new TaskDtos.View(
                e.getId(),
                projectId,
                e.getTitle(),
                e.getStatus(),
                e.getDueDate()
        );
    }
}



