package com.ict.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.FeedsEntity;

@Repository
public interface FeedsRepository extends JpaRepository<FeedsEntity,Long>{
    
    // 생성일 기준 내림차순 정렬
    List<FeedsEntity> findAllByOrderByCreatedAtDesc();

}
