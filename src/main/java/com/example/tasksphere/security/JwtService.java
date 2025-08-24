package com.example.tasksphere.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;
    private final long ttlMinutes;

    public JwtService(
            @Value("${app.jwt.secret:${JWT_SECRET:}}") String secret,
            @Value("${app.jwt.ttl-minutes:60}") long ttlMinutes
    ) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("JWT secret missing. Set env JWT_SECRET or property app.jwt.secret");
        }
        this.key = toKey(secret);
        this.ttlMinutes = ttlMinutes;
    }

    public String extractUsername(String token) {
        return parse(token).getBody().getSubject();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        Jws<Claims> jws = parse(token);
        String subject = jws.getBody().getSubject();
        Date exp = jws.getBody().getExpiration();
        return user.getUsername().equals(subject) && exp.after(new Date());
    }

    public String generateToken(UserDetails user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + Duration.ofMinutes(ttlMinutes).toMillis());
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }

    private static Key toKey(String secret) {
        // Prefer Base64 secrets; fall back to raw bytes if not Base64
        try {
            return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        } catch (IllegalArgumentException ignore) {
            return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        }
    }
}

