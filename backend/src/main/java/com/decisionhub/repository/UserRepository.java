package com.decisionhub.repository;

import com.decisionhub.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    public User findByEmail(String email) {
        User user = new User();
        user.setEmail(email);
        user.setName("Sample User");
        return user;
    }
}
