package domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity @Table(name = "TAREFA")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @Column(name = "TITULO", nullable = false, length = 200)
  private String title;

  @Column(name = "DESCRICAO", length = 1000)
  private String description;

  @Column(name = "STATUS", length = 40)
  private String status;

  @Column(name = "DATA_CRIACAO", nullable = false)
  private Instant createdAt;

  @ManyToOne(optional = false)
  @JoinColumn(name = "ID_PROJETO")
  private Project project;
}