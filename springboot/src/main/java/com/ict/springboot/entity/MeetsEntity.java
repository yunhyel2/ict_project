package com.ict.springboot.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
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
@Table(name = "MEETS")
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MeetsEntity {
    
    @Id
    @SequenceGenerator(name = "SEQ_MEETS_GENERATOR",sequenceName = "SEQ_MEETS",initialValue = 1,allocationSize = 1)
    @GeneratedValue(generator = "SEQ_MEETS_GENERATOR",strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(length = 50,nullable = false)
    private String title;

    @Column(length = 255,nullable = false)
    private String content;

    @Column(length = 20,nullable = true)
    private String category;

    @Column(nullable = false)
    private int goal;

    @Column(name = "meet_at",nullable = false)
    private LocalDateTime meetAt;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at",nullable = false)
    private LocalDateTime updatedAt;

    @Builder.Default
    @Column(nullable = false)
    private boolean isActive = false;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "FK_MEETS_USERS"))
    private UsersEntity user;

    @ManyToOne(optional =  false,fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id",foreignKey = @ForeignKey(name = "FK_MEETS_LOCATIONS"))
    private LocationsEntity location;
}
