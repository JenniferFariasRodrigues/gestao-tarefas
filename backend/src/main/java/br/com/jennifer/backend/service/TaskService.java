package br.com.jennifer.backend.service;

import br.com.jennifer.backend.domain.*;
import br.com.jennifer.backend.dto.*;
import br.com.jennifer.backend.repository.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TaskService {
  private final TaskRepository taskRepo;
  private final ProjectRepository projectRepo;

  public TaskService(TaskRepository taskRepo, ProjectRepository projectRepo) {
    this.taskRepo = taskRepo; this.projectRepo = projectRepo;
  }

  public Page<TaskResponse> list(Integer page, Integer size, Long projectId) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    Specification<Task> spec = (root, q, cb) ->
        projectId == null ? cb.conjunction() : cb.equal(root.get("project").get("id"), projectId);
    return taskRepo.findAll(spec, pageable).map(this::toResponse);
  }

  public TaskResponse create(TaskRequest req) {
    Project p = projectRepo.findById(req.projectId())
        .orElseThrow(() -> new IllegalArgumentException("Project not found: " + req.projectId()));
    Task t = new Task();
    t.setTitle(req.title());
    t.setDescription(req.description());
    t.setStatus(req.status());
    t.setCreatedAt(Instant.now());
    t.setProject(p);
    return toResponse(taskRepo.save(t));
  }

  public void delete(Long id) {
    if (!taskRepo.existsById(id)) throw new IllegalArgumentException("Task not found: " + id);
    taskRepo.deleteById(id);
  }

  private TaskResponse toResponse(Task t) {
    return new TaskResponse(
        t.getId(), t.getTitle(), t.getDescription(), t.getStatus(),
        t.getCreatedAt(),
        t.getProject() != null ? t.getProject().getId() : null,
        t.getProject() != null ? t.getProject().getName() : null
    );
  }
}
