package com.ict.springboot.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity//DB의 테이블과 1:1 매핑될 클래스라는 것
@Table(name = "FEEDS")
@Setter
@Getter
@Builder
@NoArgsConstructor//인자없는 기본생성자
@AllArgsConstructor//모든 필드를 인자로 받는 생성자
public class FeedsEntity {
    
    @Id//해당 필드가 테이블과 매핑 시 Primary Key
    @SequenceGenerator(name = "SEQ_FEEDS_GENERATOR",sequenceName = "SEQ_FEEDS",allocationSize = 1,initialValue = 1)
    @GeneratedValue(generator = "SEQ_FEEDS",strategy = GenerationType.SEQUENCE)//데이터베이스의 특별한 오브젝트 시퀀스를 사용하여 기본키를 생성
    @Column(length = 20,nullable = false)
    private long id;

    @Lob
    @Column(name="image", columnDefinition="CLOB")  // BASE64로 저장하기 위한 LONGTEXT 설정
    private String image;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(name="created_at")
    @ColumnDefault("SYSDATE")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne //(자식) 단방향 관계 → 자식: 부모 (N:1)
    @JoinColumn(name = "user_id",nullable = false)//단방향 관계로 한쪽 엔터티에서만 참조
    private UsersEntity user;

    @ManyToOne
    @JoinColumn(name ="location_id",nullable = false)
    private LocationsEntity location;
    
    @OneToMany(mappedBy = "feed")
    private List<CommentsEntity> comments;
    
    @OneToMany(mappedBy = "feed")
    private List<LikesEntity> likes;
    
}
