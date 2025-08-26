package com.example.tasksphere.web;

import com.example.tasksphere.domain.User;
import com.example.tasksphere.domain.UserRepository;
import com.example.tasksphere.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

record RegisterRequest(
        @NotBlank(message = "Full name is required") String fullName,
        @Email @NotBlank String email,
        @Size(min = 8, message = "Password must be at least 8 characters") String password
) {}

record LoginRequest(
        @Email @NotBlank String email,
        @NotBlank String password
) {}

record TokenResponse(String token) {}

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository users;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (users.existsByEmailIgnoreCase(req.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "EMAIL_TAKEN"));
        }
        try {
            User u = User.builder()
                    .fullName(req.fullName())
                    .email(req.email().toLowerCase())
                    .password(passwordEncoder.encode(req.password()))
                    .build();
            users.save(u);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DataIntegrityViolationException ex) {
            // In case of a race where the same email is inserted concurrently
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "EMAIL_TAKEN"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            var authToken = new UsernamePasswordAuthenticationToken(req.email(), req.password());
            authenticationManager.authenticate(authToken);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "INVALID_CREDENTIALS"));
        }

        var user = users.findByEmailIgnoreCase(req.email()).orElseThrow();
        // Adjust if your JwtService expects a UserDetails or claims map
        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(new TokenResponse(token));
    }
}


