package com.ict.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;

    public List<UsersDto> usersAll() {
        
        List<UsersEntity> usersEntities = usersRepository.findAll();
        return usersEntities.stream().map(entity -> UsersDto.toDto(entity)).collect(Collectors.toList());
    }

    public boolean signUp(UsersDto usersDto) {
        boolean isDuplicated = usersRepository.existsByAccountId(usersDto.getAccountId());
        if(isDuplicated) return false;

        usersRepository.save(usersDto.toEntity());
        return true;
    }

    public UsersDto loginTry(UsersDto dto) {
        
        Optional<UsersEntity> usersEntity = usersRepository.findByAccountId(dto.getAccountId());

        return UsersDto.toDto(usersEntity.orElseGet(()->null));
    }

    public boolean registerTry(String accountId) {
        boolean isDuplicated = usersRepository.existsByAccountId(accountId);
        return isDuplicated;
    }

    public UsersDto register(UsersDto dto) {
        System.out.println(dto.getCreatedAt());
        UsersEntity usersEntity = usersRepository.save(dto.toEntity());
        //기본 시각 세팅
        UsersDto dto2 = UsersDto.toDto(usersEntity);
        System.out.println(dto2.getCreatedAt());
        return dto2;
    }


  
   
    
    
    
}
