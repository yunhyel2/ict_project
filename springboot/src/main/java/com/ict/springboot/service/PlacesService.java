package com.ict.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.LocationsDto;
import com.ict.springboot.dto.PlacesDto;
import com.ict.springboot.entity.PlacesEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.PlacesRepository;
import com.ict.springboot.repository.UsersRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlacesService {

    private final UsersRepository usersRepo;

    private final PlacesRepository placesRepo;
    private final LocationsService locaServ;

    //전체 조회
    public List<PlacesDto> getAll() {
        List<PlacesEntity> placesEntities = placesRepo.findAll();
        return placesEntities.stream().map(entity -> PlacesDto.toDto(entity)).collect(Collectors.toList());
    }

    //상세 조회
    public PlacesDto getById(Long id) {
        Optional<PlacesEntity> placesEntity = placesRepo.findById(id); 

        return PlacesDto.toDto(placesEntity.orElseGet(() -> null));
    }

    //등록
    public PlacesDto create(PlacesDto dto) {
        boolean isDuplicated = placesRepo.existsById(dto.getId());
        if(isDuplicated) return null;

        //location
        LocationsDto location = locaServ.findOrCreate(dto.getAddress());
        dto.setLocation(location);
        dto.setAddress(dto.getPlaceAddress());

        //user
        UsersEntity userEntity = null;
        if(dto.getUser() != null &&dto.getUser().getId() !=0){
            userEntity = usersRepo.findById(dto.getUser().getId())
            .orElseThrow(()-> new IllegalStateException("해당 location이 DB에 없습니다."));
        }

        PlacesEntity placesEntity = PlacesEntity.builder()
            .user(userEntity)
            .name(dto.getName())
            .address(dto.getPlaceAddress())
            .image(dto.getImage())
            .category(dto.getCategory())
            .build();

        placesEntity = placesRepo.save(dto.toEntity());
        return PlacesDto.toDto(placesEntity);
    }

    //수정
    public PlacesDto update(PlacesDto dto, long id){
        PlacesDto place = PlacesDto.toDto(placesRepo.findById(id).orElseGet(()->null));
        if(place == null) return null;//비어있는 경우 수정X
        //내용이 있는 경우 수정
        if(dto.getName() != null) place.setName(dto.getName());
        if(dto.getImage() != null) place.setImage(dto.getImage());
        if(dto.getAddress() != null) place.setAddress(dto.getAddress());
        if(dto.getCategory() != null) place.setCategory(dto.getCategory());
        PlacesEntity placesEntity = placesRepo.save(place.toEntity());

        return PlacesDto.toDto(placesEntity);
    }

    //삭제
    public PlacesDto delete(long id) throws Exception {
        PlacesEntity place = placesRepo.findById(id).orElseGet(()->null);
        if (place != null) {
            try{
                placesRepo.deleteById(id);
                return PlacesDto.toDto(place);
            }
            catch (Exception e) {
                throw new Exception("데이터 삭제에 문제가 생겼습니다.");
            }
        }
        return null;
    }
    
    //중복 조회
    public boolean checkExists(String name) {
        return placesRepo.existsByName(name);
    }
}
