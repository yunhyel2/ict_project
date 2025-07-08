package com.ict.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.UsersEntity;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity,Long> {

    boolean existsByAccountId(String accountId);

    Optional<UsersEntity> findByAccountId(String accountId);

    

}