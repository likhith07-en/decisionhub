package com.decisionhub.exception;

public class PollNotFoundException extends RuntimeException {
    public PollNotFoundException(String message) {
        super(message);
    }
}
