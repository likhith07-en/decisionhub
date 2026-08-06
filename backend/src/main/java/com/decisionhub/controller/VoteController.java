package com.decisionhub.controller;

import com.decisionhub.dto.VoteRequest;
import com.decisionhub.dto.VoteResponse;
import com.decisionhub.dto.VoteResultResponse;
import com.decisionhub.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
@Tag(name = "Votes", description = "Endpoints for casting votes and retrieving poll results")
@SecurityRequirement(name = "bearerAuth")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping
    @Operation(summary = "Cast a vote", description = "Records a user's vote for a poll option")
    public ResponseEntity<VoteResponse> castVote(@Valid @RequestBody VoteRequest request, Authentication authentication) {
        VoteResponse response = voteService.castVote(request, authentication.getName());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/result/{pollId}")
    @Operation(summary = "Get vote results", description = "Retrieves live vote tallies, total votes, and current winner for a poll")
    public ResponseEntity<VoteResultResponse> getVoteResults(@PathVariable Long pollId) {
        return ResponseEntity.ok(voteService.getVoteResults(pollId));
    }
}
