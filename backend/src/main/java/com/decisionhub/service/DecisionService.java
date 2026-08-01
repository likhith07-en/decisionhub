package com.decisionhub.service;

import com.decisionhub.dto.DecisionRequest;
import com.decisionhub.dto.DecisionResponse;

import com.decisionhub.entity.Decision;
import com.decisionhub.entity.Option;
import com.decisionhub.entity.Poll;

import com.decisionhub.entity.User;
import com.decisionhub.exception.DecisionNotFoundException;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DecisionService {

    private final DecisionRepository decisionRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PollService pollService;

    public DecisionService(DecisionRepository decisionRepository,
                           UserRepository userRepository,
                           UserService userService,
                           PollService pollService) {
        this.decisionRepository = decisionRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.pollService = pollService;
    }

    @Transactional
    public DecisionResponse createDecision(DecisionRequest request, String userEmail) {
        User creator = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        Decision decision = new Decision();
        decision.setTitle(request.getTitle());
        decision.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            decision.setStatus(request.getStatus());
        }
        decision.setCreatedBy(creator);

        if (request.getPollQuestion() != null && !request.getPollQuestion().trim().isEmpty()) {
            Poll poll = new Poll();
            poll.setQuestion(request.getPollQuestion());
            poll.setDecision(decision);

            if (request.getPollOptions() != null) {
                for (String optText : request.getPollOptions()) {
                    if (optText != null && !optText.trim().isEmpty()) {
                        Option option = new Option();
                        option.setOptionText(optText.trim());
                        option.setVoteCount(0);
                        poll.addOption(option);
                    }
                }
            }
            decision.setPoll(poll);
        }

        Decision savedDecision = decisionRepository.save(decision);
        return mapToDecisionResponse(savedDecision);
    }

    public List<DecisionResponse> getAllDecisions() {
        return decisionRepository.findAll().stream()
                .map(this::mapToDecisionResponse)
                .toList();
    }

    public DecisionResponse getDecisionById(Long id) {
        Decision decision = decisionRepository.findById(id)
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + id));
        return mapToDecisionResponse(decision);
    }

    @Transactional
    public DecisionResponse updateDecision(Long id, DecisionRequest request, String userEmail) {
        Decision decision = decisionRepository.findById(id)
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + id));

        decision.setTitle(request.getTitle());
        decision.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            decision.setStatus(request.getStatus());
        }

        Decision updatedDecision = decisionRepository.save(decision);
        return mapToDecisionResponse(updatedDecision);
    }

    @Transactional
    public void deleteDecision(Long id, String userEmail) {
        Decision decision = decisionRepository.findById(id)
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + id));
        decisionRepository.delete(decision);
    }

    public DecisionResponse mapToDecisionResponse(Decision decision) {
        return new DecisionResponse(
                decision.getId(),
                decision.getTitle(),
                decision.getDescription(),
                decision.getStatus(),
                decision.getCreatedAt(),
                userService.mapToUserResponse(decision.getCreatedBy()),
                decision.getPoll() != null ? pollService.mapToPollResponse(decision.getPoll()) : null
        );
    }
}
