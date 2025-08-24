package com.example.tasksphere.web;

import com.example.tasksphere.common.dto.TimeEntryDtos;
import com.example.tasksphere.common.mapper.TimeEntryMapper;
import com.example.tasksphere.service.TimeEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time-entries")
@RequiredArgsConstructor
public class TimeEntryController {
    private final TimeEntryService service;
    private final TimeEntryMapper mapper;
    private Long userId(Authentication a){ return (Long) a.getDetails(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody TimeEntryDtos.Create req, Authentication a) {
        var te = service.create(req.taskId(), userId(a), req.startedAt(), req.minutes(), req.note());
        return ResponseEntity.ok(mapper.toView(te));
    }

    @GetMapping
    public Page<TimeEntryDtos.View> list(@RequestParam Long taskId,
                                         @RequestParam(defaultValue="0") int page,
                                         @RequestParam(defaultValue="20") int size,
                                         Authentication a) {
        var pageable = PageRequest.of(page, size);
        return service.listByTask(taskId, pageable, userId(a)).map(mapper::toView);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody TimeEntryDtos.Update req, Authentication a) {
        var te = service.update(id, userId(a), req.startedAt(), req.minutes(), req.note());
        return ResponseEntity.ok(mapper.toView(te));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication a) {
        service.delete(id, userId(a));
        return ResponseEntity.noContent().build();
    }
}

