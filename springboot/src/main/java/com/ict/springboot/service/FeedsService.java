package com.ict.springboot.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.dto.LocationsDto;
import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.repository.FeedsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedsService {

    private final FeedsRepository feedRepo;
    private final LocationsService locService;

    //전체 조회
    public List<FeedsDto> getAll(){
        List<FeedsEntity> feedsEntities = feedRepo.findAll();
        return feedsEntities.stream().map(entiy ->FeedsDto.todDto(entiy)).collect(Collectors.toList());
    }

    
    //상세조회
    public FeedsDto getById(Long id){
        Optional<FeedsEntity> feedsEntity = feedRepo.findById(id);
        return FeedsDto.todDto(feedsEntity.orElseGet(()->null));
    }
    //생성
    public FeedsDto create(FeedsDto dto){
        boolean isDuplicated = feedRepo.existsById(dto.getId());
        if(isDuplicated) return null;
        LocationsDto location = locService.findOrCreate(dto.getLocation().toString());
        dto.setLocation(location);
        FeedsEntity feedsEntity = feedRepo.save(dto.toEntity());
        return FeedsDto.todDto(feedsEntity);
    }
    //삭제
    public FeedsDto delete(FeedsDto dto) throws Exception{
        if(feedRepo.existsById(dto.getId())){
            try{
                feedRepo.deleteById(dto.getId());
            } catch (Exception e){
                throw new Exception("데이터 삭제에 문제가 생겼습니다");
            }
        }
        return dto;
    }

}
