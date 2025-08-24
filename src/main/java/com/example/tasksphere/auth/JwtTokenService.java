package com.example.tasksphere.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtTokenService {
    @Value("${security.jwt.secret}") private String secret;
    @Value("${security.jwt.issuer}") private String issuer;
    @Value("${security.jwt.expiration-minutes}") private long expiryMinutes;
    private Key key;

    @PostConstruct void init() {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Long userId, String email, String role) {
        Instant now = Instant.now();
        Instant exp = now.plusSeconds(expiryMinutes * 60);
        return Jwts.builder()
                .setIssuer(issuer)
                .setSubject(String.valueOf(userId))
                .addClaims(Map.of("email", email, "role", role))
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(exp))
                .signWith(key)
                .compact();
    }

    public JwsPayload parse(String jwt) {
        var claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        return new JwsPayload(Long.parseLong(claims.getSubject()),
                (String) claims.get("email"),
                (String) claims.get("role"));
    }

    public record JwsPayload(Long userId, String email, String role) {}
}

