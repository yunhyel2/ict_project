package com.ict.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.FeedsEntity;

@Repository
public interface FeedsRepository extends JpaRepository<FeedsEntity,Long>{
    
    // 생성일 기준 내림차순 정렬
    List<FeedsEntity> findAllByOrderByCreatedAtDesc();
    
    // 페이지네이션을 위한 메서드
    Page<FeedsEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

}
