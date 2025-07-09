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
import jakarta.persistence.Transient;
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
    private String userId;

    @Column(length = 50,nullable = false)
    private String password;

    @Column(length = 20,nullable = false)
    private String name;

    @Column(name="profile_image", length = 255)
    private String profileImage;

    @Column(length = 20, nullable = true)
    private String gender;

    @Column(length = 10, nullable=false)
    @ColumnDefault("'USER'")   // 디폴트값 문자열로 적을때 ''로 감싸야됨
    private String role;
    
    @Transient   // column이 아닌데 필요할 경우, 적어준다.
    private String address;

    @Column(name="created_at")
    @ColumnDefault("SYSDATE")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @ManyToOne
    @JoinColumn(name="location_id")
    private LocationsEntity location;

}
