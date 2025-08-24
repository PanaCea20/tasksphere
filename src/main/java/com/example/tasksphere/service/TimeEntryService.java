package com.example.tasksphere.service;

import com.example.tasksphere.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TimeEntryService {
    private final TimeEntryRepository timeEntries;
    private final TaskRepository tasks;
    private final UserRepository users;

    @Transactional
    public TimeEntry create(Long taskId, Long userId, java.time.OffsetDateTime startedAt, int minutes, String note) {
        var task = tasks.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        var user = users.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!task.getProject().getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        var te = TimeEntry.builder().task(task).user(user).startedAt(startedAt).minutes(minutes).note(note).build();
        return timeEntries.save(te);
    }

    public Page<TimeEntry> listByTask(Long taskId, Pageable pageable, Long userId) {
        var task = tasks.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (!task.getProject().getOwner().getId().equals(userId)) throw new SecurityException("Forbidden");
        return timeEntries.findByTaskId(taskId, pageable);
    }

    @Transactional
    public TimeEntry update(Long id, Long userId, java.time.OffsetDateTime startedAt, int minutes, String note) {
        var te = timeEntries.findById(id).orElseThrow(() -> new IllegalArgumentException("Time entry not found"));
        if (!te.getUser().getId().equals(userId)) throw new SecurityException("Forbidden");
        te.setStartedAt(startedAt); te.setMinutes(minutes); te.setNote(note);
        return te;
    }

    @Transactional
    public void delete(Long id, Long userId) {
        var te = timeEntries.findById(id).orElseThrow(() -> new IllegalArgumentException("Time entry not found"));
        if (!te.getUser().getId().equals(userId)) throw new SecurityException("Forbidden");
        timeEntries.delete(te);
    }
}
