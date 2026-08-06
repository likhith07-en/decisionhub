package com.decisionhub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "option_scores")
public class OptionScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id", nullable = false)
    private DecisionOption option;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factor_id", nullable = false)
    private ComparisonFactor factor;

    @Column
    private Integer score;

    public OptionScore() {
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DecisionOption getOption() {
        return option;
    }

    public void setOption(DecisionOption option) {
        this.option = option;
    }

    public ComparisonFactor getFactor() {
        return factor;
    }

    public void setFactor(ComparisonFactor factor) {
        this.factor = factor;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
