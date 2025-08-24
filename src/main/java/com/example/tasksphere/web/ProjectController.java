package com.example.tasksphere.web;

import com.example.tasksphere.api.dto.ProjectDtos;
import com.example.tasksphere.domain.Project;
import com.example.tasksphere.domain.ProjectRepository;
import com.example.tasksphere.domain.User;
import com.example.tasksphere.domain.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projects;
    private final UserRepository users;

    @PostMapping
    public ProjectDtos.View create(@Valid @RequestBody ProjectDtos.Create req,
                                   @AuthenticationPrincipal UserDetails principal) {
        User owner = users.findByEmailIgnoreCase(principal.getUsername()).orElseThrow();
        Project p = projects.save(Project.builder()
                .name(req.name())
                .description(req.description())
                .owner(owner)
                .build());
        return new ProjectDtos.View(p.getId(), p.getName(), p.getDescription(),
                p.getOwner() != null ? p.getOwner().getId() : null);
    }

    @GetMapping
    public List<ProjectDtos.View> list() {
        return projects.findAll().stream()
                .map(p -> new ProjectDtos.View(p.getId(), p.getName(), p.getDescription(),
                        p.getOwner() != null ? p.getOwner().getId() : null))
                .toList();
    }
}


