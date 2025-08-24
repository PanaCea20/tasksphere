package com.example.tasksphere.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity @Table(name="tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="project_id")
    private Project project;

    @Column(nullable=false, length=200)
    private String title;

    @Column(nullable=false, length=30)
    private String status; // OPEN/IN_PROGRESS/DONE

    private LocalDate dueDate;

    @Column(nullable=false)
    private OffsetDateTime createdAt;
}

