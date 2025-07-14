package com.ict.springboot.service;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.MeetsDto;
import com.ict.springboot.entity.LocationsEntity;
import com.ict.springboot.entity.MeetsEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.LocationsRepository;
import com.ict.springboot.repository.MeetsRepository;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetsService {
    
    private final MeetsRepository meetRepo;
    private final UsersRepository userRepo;
    private final LocationsRepository locRepo;
  
    public MeetsDto create(MeetsDto dto) {
        UsersEntity user = userRepo.findByAccount(dto.getUser().getAccount()).orElseGet(()->null);
        LocationsEntity loc = locRepo.findByLocation(dto.getLocation().getLocation()).orElseGet(()->null);
        MeetsEntity meetEntity = dto.toEntity();
        meetEntity.setUser(user);
        meetEntity.setLocation(loc);
        return MeetsDto.toDto(meetRepo.save(meetEntity));
    }




}
