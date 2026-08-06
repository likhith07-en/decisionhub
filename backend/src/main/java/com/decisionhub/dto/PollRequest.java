package com.decisionhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class PollRequest {

    @NotNull(message = "Decision ID is required")
    private Long decisionId;

    private String pollType = "SINGLE";

    private Boolean isAnonymous = false;

    @NotEmpty(message = "At least two option labels are required")
    private List<String> optionLabels;

    public PollRequest() {
    }

    public PollRequest(Long decisionId, String pollType, Boolean isAnonymous, List<String> optionLabels) {
        this.decisionId = decisionId;
        this.pollType = pollType;
        this.isAnonymous = isAnonymous;
        this.optionLabels = optionLabels;
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

    public List<String> getOptionLabels() {
        return optionLabels;
    }

    public void setOptionLabels(List<String> optionLabels) {
        this.optionLabels = optionLabels;
    }
}
