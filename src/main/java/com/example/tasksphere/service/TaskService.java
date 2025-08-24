package com.example.tasksphere.service;

import com.example.tasksphere.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository tasks;
    private final ProjectRepository projects;

    @Transactional
    public Task create(Long projectId, String title, String status, java.time.LocalDate dueDate, Long userId) {
        var project = projects.findById(projectId).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (!project.getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        var t = Task.builder().project(project).title(title)
                .status(status == null || status.isBlank() ? "OPEN" : status)
                .dueDate(dueDate).createdAt(OffsetDateTime.now()).build();
        return tasks.save(t);
    }

    public Page<Task> list(Long projectId, Pageable pageable, Long userId) {
        var project = projects.findById(projectId).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (!project.getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        return tasks.findByProjectId(projectId, pageable);
    }

    @Transactional
    public Task update(Long id, String title, String status, java.time.LocalDate dueDate, Long userId) {
        var t = tasks.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!t.getProject().getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        t.setTitle(title); if (status != null && !status.isBlank()) t.setStatus(status); t.setDueDate(dueDate);
        return t;
    }

    @Transactional
    public void delete(Long id, Long userId) {
        var t = tasks.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!t.getProject().getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        tasks.delete(t);
    }
}

