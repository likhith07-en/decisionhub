package com.decisionhub.service;

import com.decisionhub.dto.AuthResponse;
import com.decisionhub.dto.LoginRequest;
import com.decisionhub.dto.RegisterRequest;
import org.springframework.stereotype.Service;

/**
 * AuthService — delegates to UserService for now.
 * TODO: Add OAuth2/Google login, password reset, email verification, etc.
 */
@Service
public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public AuthResponse register(RegisterRequest request) {
        return userService.register(request);
    }

    public AuthResponse login(LoginRequest request) {
        return userService.login(request);
    }
}
