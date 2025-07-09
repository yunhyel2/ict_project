package com.ict.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.springboot.dto.LocationsDto;
import com.ict.springboot.entity.LocationsEntity;
import com.ict.springboot.repository.LocationsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationsService {
    
    @Autowired
    private final LocationsRepository locRepo;

    /**
     * 유저가 가입할때 받는 주소를 locations 테이블에 저장한다. 
     *  단, 있는지 먼저 조회하고 없으면 저장 후 객체 리턴      
     * */  
    public LocationsDto findOrCreate(String location) {      // 유저가 가입할때(users 저장) address 값으로 해당 메소드를 반드시 호출한다.
        LocationsEntity loc = locRepo.findByLocation(location).orElseGet(()->{     // 유저 주소가 기존 테이블에 존재하는지 검색
            LocationsEntity newLoc = LocationsEntity.builder().location(location).build(); // 없다면 새로 location 객체 생성
            return locRepo.save(newLoc); //  저장
        });
        return LocationsDto.toDto(loc);  // DTO로 반환.
    }
}
