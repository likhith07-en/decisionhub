package com.decisionhub.service;

import com.decisionhub.dto.OptionDto;
import com.decisionhub.dto.PollRequest;
import com.decisionhub.dto.PollResponse;
import com.decisionhub.entity.Decision;
import com.decisionhub.entity.Option;
import com.decisionhub.entity.Poll;
import com.decisionhub.exception.DecisionNotFoundException;
import com.decisionhub.exception.PollNotFoundException;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.PollRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final DecisionRepository decisionRepository;

    public PollService(PollRepository pollRepository, DecisionRepository decisionRepository) {
        this.pollRepository = pollRepository;
        this.decisionRepository = decisionRepository;
    }

    @Transactional
    public PollResponse createPoll(PollRequest request) {
        Decision decision = decisionRepository.findById(request.getDecisionId())
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + request.getDecisionId()));

        if (pollRepository.findByDecisionId(decision.getId()).isPresent()) {
            throw new IllegalArgumentException("Poll already exists for decision ID: " + decision.getId());
        }

        Poll poll = new Poll();
        poll.setQuestion(request.getQuestion());
        poll.setDecision(decision);

        if (request.getOptions() != null) {
            for (String optText : request.getOptions()) {
                if (optText != null && !optText.trim().isEmpty()) {
                    Option option = new Option();
                    option.setOptionText(optText.trim());
                    option.setVoteCount(0);
                    poll.addOption(option);
                }
            }
        }

        Poll savedPoll = pollRepository.save(poll);
        return mapToPollResponse(savedPoll);
    }

    public List<PollResponse> getAllPolls() {
        return pollRepository.findAll().stream()
                .map(this::mapToPollResponse)
                .toList();
    }

    public PollResponse getPollByDecisionId(Long decisionId) {
        Poll poll = pollRepository.findByDecisionId(decisionId)
                .orElseThrow(() -> new PollNotFoundException("Poll not found for decision ID: " + decisionId));
        return mapToPollResponse(poll);
    }

    public PollResponse mapToPollResponse(Poll poll) {
        if (poll == null) {
            return null;
        }
        List<OptionDto> optionDtos = poll.getOptions().stream()
                .map(opt -> new OptionDto(opt.getId(), opt.getOptionText(), opt.getVoteCount()))
                .toList();

        return new PollResponse(
                poll.getId(),
                poll.getQuestion(),
                poll.getDecision() != null ? poll.getDecision().getId() : null,
                optionDtos
        );
    }
}
