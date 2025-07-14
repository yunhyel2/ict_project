package com.ict.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ict.springboot.entity.MeetsEntity;

public interface MeetsRepository extends JpaRepository<MeetsEntity,Long>{

    
}
