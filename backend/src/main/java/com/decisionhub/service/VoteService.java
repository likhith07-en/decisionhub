package com.decisionhub.service;

import com.decisionhub.dto.OptionDto;
import com.decisionhub.dto.VoteRequest;
import com.decisionhub.dto.VoteResponse;
import com.decisionhub.dto.VoteResultResponse;
import com.decisionhub.entity.*;
import com.decisionhub.exception.DecisionNotFoundException;
import com.decisionhub.exception.DuplicateVoteException;
import com.decisionhub.exception.UserNotFoundException;
import com.decisionhub.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final DecisionRepository decisionRepository;
    private final OptionRepository optionRepository;
    private final PollRepository pollRepository;

    public VoteService(VoteRepository voteRepository,
                       UserRepository userRepository,
                       DecisionRepository decisionRepository,
                       OptionRepository optionRepository,
                       PollRepository pollRepository) {
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.decisionRepository = decisionRepository;
        this.optionRepository = optionRepository;
        this.pollRepository = pollRepository;
    }

    @Transactional
    public VoteResponse castVote(VoteRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + userEmail));

        Decision decision = decisionRepository.findById(request.getDecisionId())
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + request.getDecisionId()));

        if (decision.getStatus() == DecisionStatus.CLOSED) {
            throw new IllegalArgumentException("Voting is closed for this decision");
        }

        if (voteRepository.existsByUserIdAndDecisionId(user.getId(), decision.getId())) {
            throw new DuplicateVoteException("User has already voted on this decision");
        }

        Option option = optionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new IllegalArgumentException("Option not found with id: " + request.getOptionId()));

        if (decision.getPoll() == null || !option.getPoll().getId().equals(decision.getPoll().getId())) {
            throw new IllegalArgumentException("Option does not belong to the decision's poll");
        }

        option.setVoteCount(option.getVoteCount() + 1);
        optionRepository.save(option);

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setDecision(decision);
        vote.setOption(option);

        Vote savedVote = voteRepository.save(vote);

        return new VoteResponse(
                savedVote.getId(),
                user.getId(),
                decision.getId(),
                option.getId(),
                option.getOptionText(),
                savedVote.getCreatedAt()
        );
    }

    public VoteResultResponse getVoteResults(Long decisionId) {
        Decision decision = decisionRepository.findById(decisionId)
                .orElseThrow(() -> new DecisionNotFoundException("Decision not found with id: " + decisionId));

        Poll poll = pollRepository.findByDecisionId(decisionId).orElse(null);

        String question = poll != null ? poll.getQuestion() : "N/A";
        List<Option> optionsList = poll != null ? poll.getOptions() : List.of();

        int totalVotes = optionsList.stream()
                .mapToInt(Option::getVoteCount)
                .sum();

        Option winningOption = optionsList.stream()
                .max(Comparator.comparingInt(Option::getVoteCount))
                .orElse(null);

        String winningOptionText = (winningOption != null && winningOption.getVoteCount() > 0)
                ? winningOption.getOptionText()
                : "No votes yet";

        int winningCount = (winningOption != null) ? winningOption.getVoteCount() : 0;

        List<OptionDto> optionDtos = optionsList.stream()
                .map(opt -> new OptionDto(opt.getId(), opt.getOptionText(), opt.getVoteCount()))
                .toList();

        return new VoteResultResponse(
                decision.getId(),
                decision.getTitle(),
                question,
                totalVotes,
                winningOptionText,
                winningCount,
                optionDtos
        );
    }
}
