package com.ict.springboot.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USERS")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity {
    
    @Id
    @SequenceGenerator(name = "SEQ_USERS_GENERATOR",sequenceName = "SEQ_USERS",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "SEQ_USERS",strategy = GenerationType.SEQUENCE)
    @Column(length = 20,nullable = false)
    private long id;

    @Column(length = 20,nullable = false)
    private String accountId;

    @Column(length = 50,nullable = false)
    private String password;

    @Column(length = 20,nullable = false)
    private String userName;

    @Column(length = 255)
    private String profileImage;

    @ColumnDefault("SYSDATE")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(length = 255)
    private int locationId;

}
