package com.example.tasksphere.service;

import com.example.tasksphere.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projects;
    private final UserRepository users;

    @Transactional
    public Project create(Long ownerId, String name, String description) {
        var owner = users.findById(ownerId).orElseThrow(() -> new IllegalArgumentException("Owner not found"));
        var p = Project.builder().owner(owner).name(name).description(description)
                .createdAt(OffsetDateTime.now()).build();
        return projects.save(p);
    }

    public Page<Project> list(Long ownerId, Pageable pageable) {
        return projects.findByOwnerId(ownerId, pageable);
    }

    @Transactional
    public Project update(Long projectId, Long ownerId, String name, String description) {
        var p = projects.findById(projectId).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (!p.getOwner().getId().equals(ownerId)) throw new SecurityException("Forbidden");
        p.setName(name); p.setDescription(description);
        return p;
    }

    @Transactional
    public void delete(Long projectId, Long ownerId) {
        var p = projects.findById(projectId).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (!p.getOwner().getId().equals(ownerId)) throw new SecurityException("Forbidden");
        projects.delete(p);
    }
}

