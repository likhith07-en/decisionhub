package com.decisionhub.dto;

import java.util.List;

public class PollResponse {

    private Long id;
    private String question;
    private Long decisionId;
    private List<OptionDto> options;

    public PollResponse() {
    }

    public PollResponse(Long id, String question, Long decisionId, List<OptionDto> options) {
        this.id = id;
        this.question = question;
        this.decisionId = decisionId;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Long getDecisionId() {
        return decisionId;
    }

    public void setDecisionId(Long decisionId) {
        this.decisionId = decisionId;
    }

    public List<OptionDto> getOptions() {
        return options;
    }

    public void setOptions(List<OptionDto> options) {
        this.options = options;
    }
}
