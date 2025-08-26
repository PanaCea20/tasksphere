package com.example.tasksphere.api.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDtos {
    public record RegisterRequest(
            @JsonAlias({"name", "full_name", "fullName"})
            @NotBlank(message = "Full name is required")
            String fullName,

            @Email @NotBlank(message = "Email is required")
            String email,

            @NotBlank @Size(min = 8, message = "Password must be at least 8 characters")
            String password
    ) {}
    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}
    public record TokenResponse(String token) {}
}

