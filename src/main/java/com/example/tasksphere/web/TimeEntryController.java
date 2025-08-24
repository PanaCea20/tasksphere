package com.example.tasksphere.web;

import com.example.tasksphere.api.dto.TimeEntryDtos;
import com.example.tasksphere.domain.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/time-entries")
@RequiredArgsConstructor
public class TimeEntryController {

    private final TimeEntryRepository timeEntries;
    private final TaskRepository tasks;
    private final UserRepository users;

    @PostMapping
    public TimeEntryDtos.View create(@Valid @RequestBody TimeEntryDtos.Create req) {
        Task task = tasks.findById(req.taskId()).orElseThrow();
        User user = users.findById(req.userId()).orElseThrow();
        TimeEntry e = timeEntries.save(TimeEntry.builder()
                .task(task)
                .user(user)
                .startedAt(req.startedAt())
                .minutes(req.minutes())
                .note(req.note())
                .build());
        return new TimeEntryDtos.View(e.getId(), e.getTask().getId(), e.getUser().getId(),
                e.getStartedAt(), e.getMinutes(), e.getNote());
    }

    @GetMapping
    public List<TimeEntryDtos.View> list(@RequestParam Long taskId) {
        return timeEntries.findByTaskId(taskId).stream()
                .map(e -> new TimeEntryDtos.View(e.getId(), e.getTask().getId(), e.getUser().getId(),
                        e.getStartedAt(), e.getMinutes(), e.getNote()))
                .toList();
    }
}


