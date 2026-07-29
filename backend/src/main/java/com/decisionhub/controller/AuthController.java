package com.decisionhub.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        return Map.of(
                "message", "Login endpoint ready",
                "email", request.getOrDefault("email", "demo@example.com"),
                "token", "sample-jwt-token"
        );
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> request) {
        return Map.of(
                "message", "Registration endpoint ready",
                "email", request.getOrDefault("email", "demo@example.com")
        );
    }
}
