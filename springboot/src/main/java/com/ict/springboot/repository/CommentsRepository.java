package com.ict.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.CommentsEntity;

@Repository
public interface CommentsRepository extends JpaRepository<CommentsEntity, Long> {
    
    // 피드별 댓글 조회 (최신순)
    List<CommentsEntity> findByFeedIdOrderByCreatedAtDesc(Long feedId);
    
    // 피드별 댓글 수 조회
    long countByFeedId(Long feedId);
} 