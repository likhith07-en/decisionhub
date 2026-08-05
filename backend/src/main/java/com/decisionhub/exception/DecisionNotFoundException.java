package com.decisionhub.exception;

public class DecisionNotFoundException extends RuntimeException {
    public DecisionNotFoundException(String message) {
        super(message);
    }
}
