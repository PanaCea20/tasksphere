package com.example.tasksphere.web;

import com.example.tasksphere.common.dto.ProjectDtos;
import com.example.tasksphere.common.mapper.ProjectMapper;
import com.example.tasksphere.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService service;
    private final ProjectMapper mapper;
    private Long userId(Authentication a){ return (Long) a.getDetails(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ProjectDtos.Create req, Authentication a) {
        var p = service.create(userId(a), req.name(), req.description());
        return ResponseEntity.ok(mapper.toView(p));
    }

    @GetMapping
    public Page<ProjectDtos.View> list(@RequestParam(defaultValue="0") int page,
                                       @RequestParam(defaultValue="20") int size,
                                       @RequestParam(defaultValue="createdAt,desc") String sort,
                                       Authentication a) {
        var pageable = PageRequest.of(page, size, Sort.by(sort.split(",")));
        return service.list(userId(a), pageable).map(mapper::toView);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody ProjectDtos.Update req, Authentication a) {
        var p = service.update(id, userId(a), req.name(), req.description());
        return ResponseEntity.ok(mapper.toView(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication a) {
        service.delete(id, userId(a));
        return ResponseEntity.noContent().build();
    }
}

