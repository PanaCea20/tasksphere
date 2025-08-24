package com.example.tasksphere.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity @Table(name="time_entries")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TimeEntry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="task_id")
    private Task task;

    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="user_id")
    private User user;

    @Column(nullable=false)
    private OffsetDateTime startedAt;

    @Column(nullable=false)
    private int minutes;

    @Column(columnDefinition="text")
    private String note;
}

