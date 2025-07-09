package com.ict.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.LocationsEntity;

@Repository
public interface LocationsRepository extends JpaRepository<LocationsEntity, Long> {

    public Optional<LocationsEntity> findByLocation(String location);
} 
