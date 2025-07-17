package com.ict.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

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
  
    //<게시글 생성>
    public MeetsDto create(MeetsDto dto) {
        UsersEntity user = userRepo.findByAccount(dto.getUser().getAccount()).orElseGet(()->null);
        LocationsEntity loc = locRepo.findByLocation(dto.getLocation().getLocation()).orElseGet(()->null);
        MeetsEntity meetEntity = dto.toEntity();
        meetEntity.setUser(user);
        meetEntity.setLocation(loc);
        return MeetsDto.toDto(meetRepo.save(meetEntity));
    }

    //<전체 게시글 조회(게시글 목록)>
    public List<MeetsDto> meetAll() {
        List<MeetsEntity>  meetEntities = meetRepo.findAll();//sorted((x,y)->Long.compare(y.getId(), x.getId()))  Id값으로 내림차순 정렬
        return meetEntities.stream().map(entity->MeetsDto.toDto(entity)).sorted((x,y)->Long.compare(y.getId(), x.getId())).collect(Collectors.toList());
    }

    //<<상세 게시글 조회>>
    public MeetsDto getMeet(long id) {
        MeetsEntity meetEntity = meetRepo.findById(id).orElseGet(()->null);
        return  MeetsDto.toDto(meetEntity);
    }

    //<<게시글 삭제>>
    public void deleteMeet(long id) {
        meetRepo.deleteById(id);
    }

    public MeetsDto updateMeet(MeetsDto dto) {
        meetRepo.findById(dto.getId()).get();
        return null;
    }

    



}
