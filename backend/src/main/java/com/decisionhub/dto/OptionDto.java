package com.decisionhub.dto;

public class OptionDto {

    private Long id;
    private String optionText;
    private Integer voteCount;

    public OptionDto() {
    }

    public OptionDto(Long id, String optionText, Integer voteCount) {
        this.id = id;
        this.optionText = optionText;
        this.voteCount = voteCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }
}
