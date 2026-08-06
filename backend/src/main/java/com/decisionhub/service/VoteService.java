package com.decisionhub.service;

import com.decisionhub.dto.OptionDto;
import com.decisionhub.dto.VoteRequest;
import com.decisionhub.dto.VoteResponse;
import com.decisionhub.dto.VoteResultResponse;
import com.decisionhub.entity.*;
import com.decisionhub.exception.DuplicateVoteException;
import com.decisionhub.exception.PollNotFoundException;
import com.decisionhub.exception.UserNotFoundException;
import com.decisionhub.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final PollRepository pollRepository;
    private final PollOptionRepository pollOptionRepository;

    public VoteService(VoteRepository voteRepository,
                       UserRepository userRepository,
                       PollRepository pollRepository,
                       PollOptionRepository pollOptionRepository) {
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
        this.pollOptionRepository = pollOptionRepository;
    }

    @Transactional
    public VoteResponse castVote(VoteRequest request, String userEmail) {
        User voter = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + userEmail));

        Poll poll = pollRepository.findById(request.getPollId())
                .orElseThrow(() -> new PollNotFoundException("Poll not found with id: " + request.getPollId()));

        // Check for duplicate vote
        if (voteRepository.existsByPollIdAndVoterId(poll.getId(), voter.getId())) {
            throw new DuplicateVoteException("User has already voted on this poll");
        }

        PollOption pollOption = pollOptionRepository.findById(request.getPollOptionId())
                .orElseThrow(() -> new IllegalArgumentException("Poll option not found with id: " + request.getPollOptionId()));

        // Verify the poll option belongs to the correct poll
        if (!pollOption.getPoll().getId().equals(poll.getId())) {
            throw new IllegalArgumentException("Poll option does not belong to the specified poll");
        }

        Vote vote = new Vote();
        vote.setPoll(poll);
        vote.setPollOption(pollOption);
        vote.setVoter(voter);
        vote.setRating(request.getRating());

        Vote savedVote = voteRepository.save(vote);

        return new VoteResponse(
                savedVote.getId(),
                poll.getId(),
                pollOption.getId(),
                voter.getId(),
                pollOption.getOption().getLabel(),
                savedVote.getRating(),
                savedVote.getVotedAt()
        );
    }

    public VoteResultResponse getVoteResults(Long pollId) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new PollNotFoundException("Poll not found with id: " + pollId));

        List<Vote> votes = voteRepository.findByPollId(pollId);
        int totalVotes = votes.size();

        // Count votes per poll option
        Map<Long, Long> voteCounts = votes.stream()
                .collect(Collectors.groupingBy(v -> v.getPollOption().getId(), Collectors.counting()));

        List<PollOption> pollOptions = pollOptionRepository.findByPollId(pollId);

        List<OptionDto> optionDtos = pollOptions.stream()
                .map(po -> {
                    long count = voteCounts.getOrDefault(po.getId(), 0L);
                    return new OptionDto(po.getOption().getId(), po.getOption().getLabel(),
                            count + " votes");
                })
                .collect(Collectors.toList());

        // Determine winning option
        String winningOption = "No votes yet";
        int winningCount = 0;

        if (!voteCounts.isEmpty()) {
            Map.Entry<Long, Long> winner = voteCounts.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .orElse(null);

            if (winner != null) {
                winningCount = winner.getValue().intValue();
                PollOption winnerPo = pollOptions.stream()
                        .filter(po -> po.getId().equals(winner.getKey()))
                        .findFirst()
                        .orElse(null);
                if (winnerPo != null) {
                    winningOption = winnerPo.getOption().getLabel();
                }
            }
        }

        Decision decision = poll.getDecision();

        return new VoteResultResponse(
                poll.getId(),
                decision != null ? decision.getId() : null,
                decision != null ? decision.getTitle() : "N/A",
                poll.getPollType(),
                totalVotes,
                winningOption,
                winningCount,
                optionDtos
        );
    }
}
