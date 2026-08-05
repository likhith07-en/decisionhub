package com.decisionhub.controller;

import com.decisionhub.dto.DecisionRequest;
import com.decisionhub.dto.DecisionResponse;
import com.decisionhub.service.DecisionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decisions")
@Tag(name = "Decisions", description = "Endpoints for managing collaborative decisions")
@SecurityRequirement(name = "bearerAuth")
public class DecisionController {

    private final DecisionService decisionService;

    public DecisionController(DecisionService decisionService) {
        this.decisionService = decisionService;
    }

    @GetMapping
    @Operation(summary = "Get all decisions", description = "Retrieves all decisions created on the platform")
    public ResponseEntity<List<DecisionResponse>> getAllDecisions() {
        return ResponseEntity.ok(decisionService.getAllDecisions());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get decision by ID", description = "Retrieves a single decision by its ID")
    public ResponseEntity<DecisionResponse> getDecisionById(@PathVariable Long id) {
        return ResponseEntity.ok(decisionService.getDecisionById(id));
    }

    @PostMapping
    @Operation(summary = "Create a decision", description = "Creates a new decision along with an optional embedded poll")
    public ResponseEntity<DecisionResponse> createDecision(@Valid @RequestBody DecisionRequest request, Authentication authentication) {
        DecisionResponse response = decisionService.createDecision(request, authentication.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a decision", description = "Updates an existing decision by ID")
    public ResponseEntity<DecisionResponse> updateDecision(@PathVariable Long id, @Valid @RequestBody DecisionRequest request, Authentication authentication) {
        DecisionResponse response = decisionService.updateDecision(id, request, authentication.getName());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a decision", description = "Deletes a decision by ID")
    public ResponseEntity<Void> deleteDecision(@PathVariable Long id, Authentication authentication) {
        decisionService.deleteDecision(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
