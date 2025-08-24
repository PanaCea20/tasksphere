package com.example.tasksphere.auth;

import com.example.tasksphere.domain.User;
import com.example.tasksphere.domain.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtTokenService tokens;

    public record RegisterReq(@Email String email, @NotBlank String fullName, @NotBlank String password) {}
    public record LoginReq(@Email String email, @NotBlank String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReq req) {
        users.findByEmail(req.email()).ifPresent(u -> { throw new IllegalArgumentException("Email already used"); });
        var user = User.builder()
                .email(req.email())
                .fullName(req.fullName())
                .passwordHash(encoder.encode(req.password()))
                .role("USER")
                .createdAt(OffsetDateTime.now())
                .build();
        users.save(user);
        String jwt = tokens.createToken(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {
        var user = users.findByEmail(req.email()).orElseThrow(() -> new IllegalArgumentException("Bad credentials"));
        if (!encoder.matches(req.password(), user.getPasswordHash())) throw new IllegalArgumentException("Bad credentials");
        String jwt = tokens.createToken(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(Map.of("token", jwt));
    }
}

