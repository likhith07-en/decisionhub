package com.decisionhub.controller;

import com.decisionhub.dto.PollRequest;
import com.decisionhub.dto.PollResponse;
import com.decisionhub.service.PollService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@Tag(name = "Polls", description = "Endpoints for poll creation and listing")
@SecurityRequirement(name = "bearerAuth")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    @Operation(summary = "Create a poll", description = "Creates a standalone poll linked to a decision")
    public ResponseEntity<PollResponse> createPoll(@Valid @RequestBody PollRequest request) {
        PollResponse response = pollService.createPoll(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all polls", description = "Retrieves all polls on the platform")
    public ResponseEntity<List<PollResponse>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @GetMapping("/decision/{decisionId}")
    @Operation(summary = "Get poll by decision ID", description = "Retrieves poll details associated with a decision ID")
    public ResponseEntity<PollResponse> getPollByDecisionId(@PathVariable Long decisionId) {
        return ResponseEntity.ok(pollService.getPollByDecisionId(decisionId));
    }
}
