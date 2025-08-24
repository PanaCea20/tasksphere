package com.example.tasksphere.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity @Table(name="users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true, length=320)
    private String email;

    @Column(name="password_hash", nullable=false, length=100)
    private String passwordHash;

    @Column(nullable=false, length=200)
    private String fullName;

    @Column(nullable=false, length=20)
    private String role; // USER/ADMIN

    @Column(nullable=false)
    private OffsetDateTime createdAt;
}

