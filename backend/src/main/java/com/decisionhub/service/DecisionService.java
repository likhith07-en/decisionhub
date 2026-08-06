package com.decisionhub.service;

import com.decisionhub.dto.DecisionRequest;
import com.decisionhub.dto.DecisionResponse;
import com.decisionhub.dto.OptionDto;
import com.decisionhub.dto.PollResponse;
import com.decisionhub.entity.*;
import com.decisionhub.exception.DecisionNotFoundException;
import com.decisionhub.repository.CategoryRepository;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DecisionService {

    private final DecisionRepository decisionRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;

    public DecisionService(DecisionRepository decisionRepository,
                           UserRepository userRepository,
                           CategoryRepository categoryRepository,
                           UserService userService) {
        this.decisionRepository = decisionRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    @Transactional
    public DecisionResponse createDecision(DecisionRequest request, String userEmail) {
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        Decision decision = new Decision();
        decision.setTitle(request.getTitle());
        decision.setDescription(request.getDescription());
        decision.setOwner(owner);

        if (request.getVisibility() != null) {
            decision.setVisibility(request.getVisibility());
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            decision.setCategory(category);
        }

        // Create embedded poll + decision options if provided
        if (request.getOptionLabels() != null && !request.getOptionLabels().isEmpty()) {
            // Create decision options
            for (String label : request.getOptionLabels()) {
                if (label != null && !label.trim().isEmpty()) {
                    DecisionOption option = new DecisionOption();
                    option.setLabel(label.trim());
                    option.setDecision(decision);
                    decision.getOptions().add(option);
                }
            }

            // Create poll if pollType is specified
            if (request.getPollType() != null && !request.getPollType().trim().isEmpty()) {
                Poll poll = new Poll();
                poll.setPollType(request.getPollType());
                poll.setIsAnonymous(request.getIsAnonymous() != null ? request.getIsAnonymous() : false);
                poll.setDecision(decision);
                decision.getPolls().add(poll);

                // Note: PollOptions (linking poll to decision_options) should be created
                // after both are persisted, since they need IDs. This is handled in a follow-up
                // or via the PollService.
            }
        }

        Decision savedDecision = decisionRepository.save(decision);
        return mapToDecisionResponse(savedDecision);
    }

    @Transactional(readOnly = true)
    public List<DecisionResponse> getAllDecisions() {
        return decisionRepository.findByIsDeletedFalse().stream()
                .map(this::mapToDecisionResponse)
                .toList();
    }

    @Transactional(readOnly = true)
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
        if (request.getVisibility() != null) {
            decision.setVisibility(request.getVisibility());
        }
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            decision.setCategory(category);
        }

        Decision updatedDecision = decisionRepository.save(decision);
        return mapToDecisionResponse(updatedDecision);
    }

    @Transactional
    public void deleteDecision(Long id, String userEmail) {
        Decision decision = decisionRepository.findById(id)
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + id));
        // Soft delete
        decision.setIsDeleted(true);
        decisionRepository.save(decision);
    }

    public DecisionResponse mapToDecisionResponse(Decision decision) {
        List<PollResponse> pollResponses = new ArrayList<>();
        if (decision.getPolls() != null) {
            for (Poll poll : decision.getPolls()) {
                List<OptionDto> optionDtos = new ArrayList<>();
                if (poll.getPollOptions() != null) {
                    optionDtos = poll.getPollOptions().stream()
                            .map(po -> new OptionDto(po.getOption().getId(), po.getOption().getLabel(), po.getOption().getDescription()))
                            .collect(Collectors.toList());
                }
                pollResponses.add(new PollResponse(
                        poll.getId(),
                        decision.getId(),
                        poll.getPollType(),
                        poll.getIsAnonymous(),
                        poll.getEndsAt(),
                        optionDtos
                ));
            }
        }

        return new DecisionResponse(
                decision.getId(),
                decision.getTitle(),
                decision.getDescription(),
                decision.getVisibility(),
                decision.getIsDeleted(),
                decision.getCreatedAt(),
                userService.mapToUserResponse(decision.getOwner()),
                decision.getCategory() != null ? decision.getCategory().getId() : null,
                decision.getCategory() != null ? decision.getCategory().getName() : null,
                pollResponses
        );
    }
}
