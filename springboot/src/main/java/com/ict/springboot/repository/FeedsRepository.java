package com.ict.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.FeedsEntity;

@Repository
public interface FeedsRepository extends JpaRepository<FeedsEntity,Long>{
    
    // 생성일 기준 내림차순 정렬
    List<FeedsEntity> findAllByOrderByCreatedAtDesc();
    
    // 페이지네이션을 위한 메서드
    Page<FeedsEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // 메인을 위한 핫한 피드 
    @Query(
        value = """
        SELECT f.* FROM feeds f
        ORDER BY f.createdAt DESC, f.likesCount DESC, f.commentsCount DESC
        OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY
        """,
        nativeQuery = true
    )
    List<FeedsEntity> findHotByOrderByCreatedAtDescLimit(int limit);

}
