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
            params.get("account"), 
            params.get("name"), 
            params.get("gender"), 
            params.get("location"), 
            params.get("role")
        );
        return usersEntities.stream().map(entity -> UsersDto.toDto(entity)).collect(Collectors.toList());
    }

    /* 상세 조회 */
    public UsersDto getByAccount(String account) {
        Optional<UsersEntity> usersEntity = userRepo.findByAccount(account);
        return UsersDto.toDto(usersEntity.orElseGet(()->null));
    }

    /* 생성 */
    public UsersDto create(UsersDto dto) {
        boolean isDuplicated = userRepo.existsByAccount(dto.getAccount()); // 기존 테이블에 저장되어있는지 체크 (유니크한 키로 작성)
        if (isDuplicated) return null; // 유니크 중복의 경우 저장안함 (아래로 내려갈시 에러 반환)
        LocationsDto location = locService.findOrCreate(dto.getAddress());
        dto.setLocation(location);
        UsersEntity usersEntity = userRepo.save(dto.toEntity());     // 저장 후 반환되는 객체를 받아
        return UsersDto.toDto(usersEntity);     // dto 상태로 변환하여 리턴
    }

    /* 수정 */
    public UsersDto update(String account, UsersDto newUser) {
        UsersDto user = UsersDto.toDto(userRepo.findByAccount(account).orElseGet(()-> null));
        if (user == null) return null;  // 수정 불가능
        // 값이 있는 경우에만 수정한다. (null로 덮어쓰지 않는다.)
        if (newUser.getName() != null) user.setName(newUser.getName());
        if (newUser.getGender() != null) user.setGender(newUser.getGender());
        if (newUser.getPassword() != null) user.setPassword(newUser.getPassword());
        if (newUser.getProfileImage() != null) user.setProfileImage(newUser.getProfileImage());
        if (newUser.getAddress() != null) {
            LocationsDto location = locService.findOrCreate(newUser.getAddress());
            user.setLocation(location);
        }
        UsersEntity usersEntity = userRepo.save(user.toEntity());
        return UsersDto.toDto(usersEntity);
    }

    /* 삭제 */
    public UsersDto delete(String account) throws Exception {
        UsersEntity user = userRepo.findByAccount(account).orElseGet(()-> null);
        if (user != null) {
            try {
                userRepo.deleteById(user.getId());
                return UsersDto.toDto(user);
            } catch (Exception e) {
                throw new Exception("데이터 삭제에 문제가 생겼습니다.");
            }
        }
        return null;
    }
  
   
    /* 중복 조회 */
    public boolean checkExists(String account) {
        return userRepo.existsByAccount(account);
    }
    
    
}
