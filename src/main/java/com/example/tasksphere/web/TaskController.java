package com.example.tasksphere.web;

import com.example.tasksphere.api.dto.TaskDtos;
import com.example.tasksphere.domain.Project;
import com.example.tasksphere.domain.ProjectRepository;
import com.example.tasksphere.domain.Task;
import com.example.tasksphere.domain.TaskRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository tasks;
    private final ProjectRepository projects;

    @PostMapping
    public TaskDtos.View create(@Valid @RequestBody TaskDtos.Create req) {
        Project project = projects.findById(req.projectId()).orElseThrow();
        Task t = tasks.save(Task.builder()
                .project(project)
                .title(req.title())
                .status(req.status())
                .dueDate(req.dueDate())
                .build());
        return new TaskDtos.View(t.getId(), t.getProject().getId(), t.getTitle(), t.getStatus(), t.getDueDate());
    }

    @GetMapping
    public List<TaskDtos.View> list(@RequestParam(required = false) Long projectId) {
        var list = (projectId == null) ? tasks.findAll() : tasks.findByProjectId(projectId);
        return list.stream()
                .map(t -> new TaskDtos.View(t.getId(), t.getProject().getId(), t.getTitle(), t.getStatus(), t.getDueDate()))
                .toList();
    }
}


