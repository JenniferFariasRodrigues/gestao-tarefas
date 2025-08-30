package br.com.jennifer.backend.controller;

import br.com.jennifer.backend.dto.TaskRequest;
import br.com.jennifer.backend.dto.TaskResponse;
import br.com.jennifer.backend.service.TaskService;
import br.com.jennifer.backend.repository.ProjectRepository;
import br.com.jennifer.backend.domain.Project;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tasks")
public class TaskController {

  private final TaskService taskService;
  private final ProjectRepository projectRepository;

  public TaskController(TaskService taskService, ProjectRepository projectRepository) {
    this.taskService = taskService;
    this.projectRepository = projectRepository;
  }

  @GetMapping
  public Page<TaskResponse> list(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "10") Integer size,
      @RequestParam(required = false) Long projectId
  ) {
    return taskService.list(page, size, projectId);
  }

  @PostMapping
  public TaskResponse create(@Valid @RequestBody TaskRequest request) {
    return taskService.create(request);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    taskService.delete(id);
  }

  @GetMapping("/projects")
  public List<Project> projects() {
    return projectRepository.findAll(org.springframework.data.domain.Sort.by("name"));
  }
}
