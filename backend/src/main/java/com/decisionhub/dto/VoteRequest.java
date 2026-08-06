package com.decisionhub.dto;

import jakarta.validation.constraints.NotNull;

public class VoteRequest {

    @NotNull(message = "Poll ID is required")
    private Long pollId;

    @NotNull(message = "Poll Option ID is required")
    private Long pollOptionId;

    private Integer rating;

    public VoteRequest() {
    }

    public VoteRequest(Long pollId, Long pollOptionId, Integer rating) {
        this.pollId = pollId;
        this.pollOptionId = pollOptionId;
        this.rating = rating;
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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
