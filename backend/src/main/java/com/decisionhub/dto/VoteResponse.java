package com.decisionhub.dto;

import java.time.LocalDateTime;

public class VoteResponse {

    private Long id;
    private Long pollId;
    private Long pollOptionId;
    private Long voterId;
    private String optionLabel;
    private Integer rating;
    private LocalDateTime votedAt;

    public VoteResponse() {
    }

    public VoteResponse(Long id, Long pollId, Long pollOptionId, Long voterId,
                        String optionLabel, Integer rating, LocalDateTime votedAt) {
        this.id = id;
        this.pollId = pollId;
        this.pollOptionId = pollOptionId;
        this.voterId = voterId;
        this.optionLabel = optionLabel;
        this.rating = rating;
        this.votedAt = votedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    public Long getPollOptionId() {
        return pollOptionId;
    }

    public void setPollOptionId(Long pollOptionId) {
        this.pollOptionId = pollOptionId;
    }

    public Long getVoterId() {
        return voterId;
    }

    public void setVoterId(Long voterId) {
        this.voterId = voterId;
    }

    public String getOptionLabel() {
        return optionLabel;
    }

    public void setOptionLabel(String optionLabel) {
        this.optionLabel = optionLabel;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDateTime getVotedAt() {
        return votedAt;
    }

    public void setVotedAt(LocalDateTime votedAt) {
        this.votedAt = votedAt;
    }
}
