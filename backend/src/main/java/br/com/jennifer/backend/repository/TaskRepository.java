package br.com.jennifer.backend.repository;

import br.com.jennifer.backend.domain.*;
import org.springframework.data.jpa.repository.*;
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {}