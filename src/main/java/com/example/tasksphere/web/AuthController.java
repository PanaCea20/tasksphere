package com.example.tasksphere.web;

import com.example.tasksphere.api.dto.AuthDtos.*;
import com.example.tasksphere.domain.User;
import com.example.tasksphere.domain.UserRepository;
import com.example.tasksphere.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@Valid @RequestBody RegisterRequest req) {
        users.findByEmailIgnoreCase(req.email()).ifPresent(u -> {
            throw new IllegalArgumentException("Email already registered");
        });
        var user = User.builder()
                .email(req.email().toLowerCase())
                .fullName(req.fullName())
                .password(encoder.encode(req.password()))
                .build();
        users.save(user);
        return ResponseEntity.ok(new TokenResponse(jwt.generateToken(user.getEmail())));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest req) {
        var user = users.findByEmailIgnoreCase(req.email())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!encoder.matches(req.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return ResponseEntity.ok(new TokenResponse(jwt.generateToken(user.getEmail())));
    }
}
