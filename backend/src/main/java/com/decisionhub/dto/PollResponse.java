package com.decisionhub.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PollResponse {

    private Long id;
    private Long decisionId;
    private String pollType;
    private Boolean isAnonymous;
    private LocalDateTime endsAt;
    private List<OptionDto> options;

    public PollResponse() {
    }

    public PollResponse(Long id, Long decisionId, String pollType, Boolean isAnonymous,
                        LocalDateTime endsAt, List<OptionDto> options) {
        this.id = id;
        this.decisionId = decisionId;
        this.pollType = pollType;
        this.isAnonymous = isAnonymous;
        this.endsAt = endsAt;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(Long decisionId) {
        this.decisionId = decisionId;
    }

    public String getPollType() {
        return pollType;
    }

    public void setPollType(String pollType) {
        this.pollType = pollType;
    }

    public Boolean getIsAnonymous() {
        return isAnonymous;
    }

    public void setIsAnonymous(Boolean isAnonymous) {
        this.isAnonymous = isAnonymous;
    }

    public LocalDateTime getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(LocalDateTime endsAt) {
        this.endsAt = endsAt;
    }

    public List<OptionDto> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDto> options) {
        this.options = options;
    }
}
