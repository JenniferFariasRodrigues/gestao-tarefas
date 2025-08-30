package br.com.jennifer.backend.dto;

import jakarta.validation.constraints.*;

public record TaskRequest(
    @NotBlank(message = "Title is mandatory")
    String title,
    String description,
    String status,
    @NotNull(message = "Project id is required")
    Long projectId
) {}