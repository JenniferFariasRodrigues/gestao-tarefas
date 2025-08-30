package br.com.jennifer.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "PROJETO")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @Column(name = "NOME", nullable = false, length = 120)
  private String name;
}