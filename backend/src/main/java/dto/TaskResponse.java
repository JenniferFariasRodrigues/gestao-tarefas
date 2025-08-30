package dto;

import java.time.Instant;

public record TaskResponse(
    Long id,
    String title,
    String description,
    String status,
    Instant createdAt,
    Long projectId,
    String projectName
) {}