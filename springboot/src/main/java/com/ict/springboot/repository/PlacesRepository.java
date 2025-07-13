    package com.ict.springboot.repository;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import com.ict.springboot.entity.PlacesEntity;

    @Repository
    public interface PlacesRepository extends JpaRepository<PlacesEntity, Long>{

        //중복 조회
        boolean existsByName(String name);
    }
