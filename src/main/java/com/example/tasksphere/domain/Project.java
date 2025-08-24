package com.example.tasksphere.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity @Table(name="projects")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="owner_id")
    private User owner;

    @Column(nullable=false, length=200)
    private String name;

    @Column(columnDefinition="text")
    private String description;

    @Column(nullable=false)
    private OffsetDateTime createdAt;
}

