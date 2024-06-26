package com.cts.authorization.exception;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * The type Global exception handler.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * The Message.
     */
    static final String MESSAGE = "Message";

    @Override
    public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(MESSAGE, ex.getMessage());
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDateTime.now(), errorMap);
        log.error(ex.getMessage());
        return new ResponseEntity<>(exceptionDetails, status);
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                               HttpHeaders headers, HttpStatus status, WebRequest request) {
        Map<String, String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
        ExceptionDetails exceptionDetail = new ExceptionDetails(LocalDateTime.now(), errorMap);
        return new ResponseEntity<>(exceptionDetail, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle global exception response entity.
     *
     * @param ex      the ex
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleGlobalException(UserNotFoundException ex, WebRequest request) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(MESSAGE, ex.getMessage());
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDateTime.now(), errorMap);
        log.error(ex.getMessage());
        return new ResponseEntity<>(exceptionDetails, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handle global exception response entity.
     *
     * @param ex      the ex
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(MESSAGE, ex.getMessage());
        ExceptionDetails exceptionDetails = new ExceptionDetails(LocalDateTime.now(), errorMap);
        log.error(ex.getMessage());
        return new ResponseEntity<>(exceptionDetails, HttpStatus.UNAUTHORIZED);
    }
}