package com.example.tasksphere.service;

import com.example.tasksphere.domain.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.OffsetDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;

class ProjectServiceTest {
    @Test
    void createProject() {
        var users = Mockito.mock(UserRepository.class);
        var projects = Mockito.mock(ProjectRepository.class);
        var svc = new ProjectService(projects, users);

        var user = User.builder().id(1L).email("a@b.com").fullName("A")
                .passwordHash("x").role("USER").createdAt(OffsetDateTime.now()).build();
        Mockito.when(users.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(projects.save(Mockito.any())).thenAnswer(i -> i.getArguments()[0]);

        var p = svc.create(1L, "Demo", "Desc");
        assertThat(p.getName()).isEqualTo("Demo");
    }

    @Test
    void listProjects() {
        var users = Mockito.mock(UserRepository.class);
        var projects = Mockito.mock(ProjectRepository.class);
        var svc = new ProjectService(projects, users);

        Mockito.when(projects.findByOwnerId(eq(1L), any(Pageable.class)))
                .thenReturn(new PageImpl<>(java.util.List.of()));
        assertThat(svc.list(1L, Pageable.ofSize(10)).getTotalElements()).isEqualTo(0);
    }
}
