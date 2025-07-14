package com.ict.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ict.springboot.entity.UsersEntity;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity,Long> {

    boolean existsByAccount(String account);

    Optional<UsersEntity> findByAccount(String account);

    @Query("SELECT u FROM UsersEntity u WHERE " +
            "(:account IS NULL OR u.account LIKE %:account%) AND " +
            "(:name IS NULL OR u.name LIKE %:name%) AND " +
            "(:location IS NULL OR u.location IS NULL OR u.location.location LIKE %:location%) AND " +
            "(:role IS NULL OR u.role LIKE %:role%) AND " +
            "(:gender IS NULL OR u.gender LIKE %:gender%)")
    List<UsersEntity> searchByParams(
        @Param("account") Object account,
        @Param("name") Object name,
        @Param("gender") Object gender,
        @Param("location") Object location,
        @Param("role") Object role
    );

    //아이디와 비밀번호가 맞는지 비교하기 위한 쿼리 메소드
	Optional<UsersEntity> findByAccountAndPassword(String account, String password);


}