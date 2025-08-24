package com.example.tasksphere.web;

import com.example.tasksphere.common.dto.TaskDtos;
import com.example.tasksphere.common.mapper.TaskMapper;
import com.example.tasksphere.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService service;
    private final TaskMapper mapper;
    private Long userId(Authentication a){ return (Long) a.getDetails(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody TaskDtos.Create req, Authentication a) {
        var t = service.create(req.projectId(), req.title(), req.status(), req.dueDate(), userId(a));
        return ResponseEntity.ok(mapper.toView(t));
    }

    @GetMapping
    public Page<TaskDtos.View> list(@RequestParam Long projectId,
                                    @RequestParam(defaultValue="0") int page,
                                    @RequestParam(defaultValue="20") int size,
                                    @RequestParam(defaultValue="createdAt,desc") String sort,
                                    Authentication a) {
        var pageable = PageRequest.of(page, size, Sort.by(sort.split(",")));
        return service.list(projectId, pageable, userId(a)).map(mapper::toView);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody TaskDtos.Update req, Authentication a) {
        var t = service.update(id, req.title(), req.status(), req.dueDate(), userId(a));
        return ResponseEntity.ok(mapper.toView(t));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication a) {
        service.delete(id, userId(a));
        return ResponseEntity.noContent().build();
    }
}

