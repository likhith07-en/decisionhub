package com.decisionhub.dto;

import java.util.List;

public class VoteResultResponse {

    private Long pollId;
    private Long decisionId;
    private String decisionTitle;
    private String pollType;
    private Integer totalVotes;
    private String winningOption;
    private Integer winningVoteCount;
    private List<OptionDto> options;

    public VoteResultResponse() {
    }

    public VoteResultResponse(Long pollId, Long decisionId, String decisionTitle, String pollType,
                              Integer totalVotes, String winningOption, Integer winningVoteCount,
                              List<OptionDto> options) {
        this.pollId = pollId;
        this.decisionId = decisionId;
        this.decisionTitle = decisionTitle;
        this.pollType = pollType;
        this.totalVotes = totalVotes;
        this.winningOption = winningOption;
        this.winningVoteCount = winningVoteCount;
        this.options = options;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    public Long getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(Long decisionId) {
        this.decisionId = decisionId;
    }

    public String getDecisionTitle() {
        return decisionTitle;
    }

    public void setDecisionTitle(String decisionTitle) {
        this.decisionTitle = decisionTitle;
    }

    public String getPollType() {
        return pollType;
    }

    public void setPollType(String pollType) {
        this.pollType = pollType;
    }

    public Integer getTotalVotes() {
        return totalVotes;
    }

    public void setTotalVotes(Integer totalVotes) {
        this.totalVotes = totalVotes;
    }

    public String getWinningOption() {
        return winningOption;
    }

    public void setWinningOption(String winningOption) {
        this.winningOption = winningOption;
    }

    public Integer getWinningVoteCount() {
        return winningVoteCount;
    }

    public void setWinningVoteCount(Integer winningVoteCount) {
        this.winningVoteCount = winningVoteCount;
    }

    public List<OptionDto> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDto> options) {
        this.options = options;
    }
}
