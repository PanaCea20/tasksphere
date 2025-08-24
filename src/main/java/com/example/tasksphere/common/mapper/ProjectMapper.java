package com.example.tasksphere.common.mapper;

import com.example.tasksphere.common.dto.ProjectDtos;
import com.example.tasksphere.domain.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
    public ProjectDtos.View toView(Project e) {
        return new ProjectDtos.View(
                e.getId(),
                e.getName(),
                e.getDescription(),
                e.getOwner() != null ? e.getOwner().getFullName() : null
        );
    }
}



