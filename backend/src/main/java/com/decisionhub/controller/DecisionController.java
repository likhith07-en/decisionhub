package com.decisionhub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/decisions")
public class DecisionController {

    @GetMapping
    public List<Map<String, Object>> listDecisions() {
        return List.of(
                Map.of("id", 1, "title", "Choose a release platform", "status", "active"),
                Map.of("id", 2, "title", "Pick a design system", "status", "draft")
        );
    }
}
