package com.ict.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.LikesEntity;

@Repository
public interface LikesRepository extends JpaRepository<LikesEntity, Long> {
    
    // 피드별 좋아요 수 조회
    long countByFeedId(Long feedId);
    
    // 사용자가 특정 피드에 좋아요를 눌렀는지 확인
    Optional<LikesEntity> findByFeedIdAndUserId(Long feedId, Long userId);
    
    // 사용자가 특정 피드에 좋아요를 눌렀는지 확인 (존재 여부만)
    boolean existsByFeedIdAndUserId(Long feedId, Long userId);
} 