package com.ict.springboot.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "COMMENTS")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentsEntity {
    
    @Id
    @SequenceGenerator(name = "SEQ_COMMENTS_GENERATOR", sequenceName = "SEQ_COMMENTS", allocationSize = 1, initialValue = 1)
    @GeneratedValue(generator = "SEQ_COMMENTS", strategy = GenerationType.SEQUENCE)
    @Column(length = 20, nullable = false)
    private long id;

    @Column(length = 500, nullable = false)
    private String content;

    @Column(name="created_at")
    @ColumnDefault("SYSDATE")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "feed_id", nullable = false)
    private FeedsEntity feed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UsersEntity user;
} 