package repository;

import domain.Task;
import org.springframework.data.jpa.repository.*;
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {}