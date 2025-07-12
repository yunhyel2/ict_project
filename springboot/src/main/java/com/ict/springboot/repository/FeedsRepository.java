package com.ict.springboot.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.FeedsEntity;

@Repository
public interface FeedsRepository extends JpaRepository<FeedsEntity,Long>{



    

    
}
