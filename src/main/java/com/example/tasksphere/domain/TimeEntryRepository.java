package com.example.tasksphere.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TimeEntryRepository extends JpaRepository<TimeEntry, Long> {
    List<TimeEntry> findByTaskId(Long taskId);
}
