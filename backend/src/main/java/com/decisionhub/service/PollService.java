package com.decisionhub.service;

import com.decisionhub.dto.OptionDto;
import com.decisionhub.dto.PollRequest;
import com.decisionhub.dto.PollResponse;
import com.decisionhub.entity.Decision;
import com.decisionhub.entity.DecisionOption;
import com.decisionhub.entity.Poll;
import com.decisionhub.entity.PollOption;
import com.decisionhub.exception.DecisionNotFoundException;
import com.decisionhub.exception.PollNotFoundException;
import com.decisionhub.repository.DecisionRepository;
import com.decisionhub.repository.DecisionOptionRepository;
import com.decisionhub.repository.PollRepository;
import com.decisionhub.repository.PollOptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final DecisionRepository decisionRepository;
    private final DecisionOptionRepository decisionOptionRepository;
    private final PollOptionRepository pollOptionRepository;

    public PollService(PollRepository pollRepository,
                       DecisionRepository decisionRepository,
                       DecisionOptionRepository decisionOptionRepository,
                       PollOptionRepository pollOptionRepository) {
        this.pollRepository = pollRepository;
        this.decisionRepository = decisionRepository;
        this.decisionOptionRepository = decisionOptionRepository;
        this.pollOptionRepository = pollOptionRepository;
    }

    @Transactional
    public PollResponse createPoll(PollRequest request) {
        Decision decision = decisionRepository.findById(request.getDecisionId())
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + request.getDecisionId()));

        // Check if poll already exists for this decision
        List<Poll> existingPolls = pollRepository.findByDecisionId(decision.getId());
        if (!existingPolls.isEmpty()) {
            throw new IllegalArgumentException("Poll already exists for decision ID: " + decision.getId());
        }

        Poll poll = new Poll();
        poll.setPollType(request.getPollType() != null ? request.getPollType() : "SINGLE");
        poll.setIsAnonymous(request.getIsAnonymous() != null ? request.getIsAnonymous() : false);
        poll.setDecision(decision);

        Poll savedPoll = pollRepository.save(poll);

        // Create decision options and link them as poll options
        if (request.getOptionLabels() != null) {
            for (String label : request.getOptionLabels()) {
                if (label != null && !label.trim().isEmpty()) {
                    // Create decision option
                    DecisionOption decisionOption = new DecisionOption();
                    decisionOption.setLabel(label.trim());
                    decisionOption.setDecision(decision);
                    DecisionOption savedOption = decisionOptionRepository.save(decisionOption);

                    // Create poll option linking poll to decision option
                    PollOption pollOption = new PollOption();
                    pollOption.setPoll(savedPoll);
                    pollOption.setOption(savedOption);
                    pollOptionRepository.save(pollOption);
                }
            }
        }

        // Refresh to get the saved poll options
        Poll refreshedPoll = pollRepository.findById(savedPoll.getId())
                .orElseThrow(() -> new PollNotFoundException("Poll not found"));
        return mapToPollResponse(refreshedPoll);
    }

    public List<PollResponse> getAllPolls() {
        return pollRepository.findAll().stream()
                .map(this::mapToPollResponse)
                .toList();
    }

    public PollResponse getPollByDecisionId(Long decisionId) {
        List<Poll> polls = pollRepository.findByDecisionId(decisionId);
        if (polls.isEmpty()) {
            throw new PollNotFoundException("Poll not found for decision ID: " + decisionId);
        }
        return mapToPollResponse(polls.get(0));
    }

    public PollResponse mapToPollResponse(Poll poll) {
        if (poll == null) {
            return null;
        }

        List<OptionDto> optionDtos = new ArrayList<>();
        if (poll.getPollOptions() != null) {
            optionDtos = poll.getPollOptions().stream()
                    .map(po -> new OptionDto(
                            po.getOption().getId(),
                            po.getOption().getLabel(),
                            po.getOption().getDescription()))
                    .collect(Collectors.toList());
        }

        return new PollResponse(
                poll.getId(),
                poll.getDecision() != null ? poll.getDecision().getId() : null,
                poll.getPollType(),
                poll.getIsAnonymous(),
                poll.getEndsAt(),
                optionDtos
        );
    }
}
