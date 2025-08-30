package br.com.jennifer.backend.repository;


import br.com.jennifer.backend.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {}