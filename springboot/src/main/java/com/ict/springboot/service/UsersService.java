package com.ict.springboot.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.LocationsDto;
import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository userRepo;
    private final LocationsService locService;

    /* 전체 조회 */
    public List<UsersDto> getAll() {
        List<UsersEntity> usersEntities = userRepo.findAll();
        return usersEntities.stream().map(entity -> UsersDto.toDto(entity)).collect(Collectors.toList());
    }

    /* 검색 조회 (**안해도 무방한데 관리자 페이지에 검색을 넣으면 좋을 것 같아서 넣어봤습니다.) */
    public List<UsersDto> searchByParams(Map params) {
        List<UsersEntity> usersEntities = userRepo.searchByParams(
            params.get("userId"), 
            params.get("name"), 
            params.get("gender"), 
            params.get("location"), 
            params.get("role")
        );
        return usersEntities.stream().map(entity -> UsersDto.toDto(entity)).collect(Collectors.toList());
    }

    /* 상세 조회 */
    public UsersDto getByUserId(String userId) {
        Optional<UsersEntity> usersEntity = userRepo.findByUserId(userId);
        return UsersDto.toDto(usersEntity.orElseGet(()->null));
    }

    /* 생성 */
    public UsersDto create(UsersDto dto) {
        boolean isDuplicated = userRepo.existsByUserId(dto.getUserId()); // 기존 테이블에 저장되어있는지 체크 (유니크한 키로 작성)
        if (isDuplicated) return null; // 유니크 중복의 경우 저장안함 (아래로 내려갈시 에러 반환)
        LocationsDto location = locService.findOrCreate(dto.getAddress());
        dto.setLocation(location);
        UsersEntity usersEntity = userRepo.save(dto.toEntity());     // 저장 후 반환되는 객체를 받아
        return UsersDto.toDto(usersEntity);     // dto 상태로 변환하여 리턴
    }

    /* 수정 */
    public UsersDto update(UsersDto dto) {
        // 유저 기존 테이블에 저장된 아이디인지 체크
        boolean isDuplicated = userRepo.existsByUserId(dto.getUserId());
        if (isDuplicated) return null; // 이미 가입된 아이디일 경우 저장안함;
        // 새로운 회원일 경우 save로 저장 : 저장된 객체를 반환하는데(기본값이 자동으로 들어갑니다), 그걸 dto로 변환해서 리턴한다.
        UsersEntity usersEntity = userRepo.save(dto.toEntity());
        return UsersDto.toDto(usersEntity);
    }

    /* 삭제 */
    public UsersDto delete(UsersDto dto) throws Exception {
        if (userRepo.existsByUserId(dto.getUserId())) {
            try {
                userRepo.deleteById(dto.getId());
            } catch (Exception e) {
                throw new Exception("데이터 삭제에 문제가 생겼습니다.");
            }
        }
        return dto;
    }
  
   
    /* 중복 조회 */
    public boolean checkExists(String userId) {
        return userRepo.existsByUserId(userId);
    }
    
    
}
