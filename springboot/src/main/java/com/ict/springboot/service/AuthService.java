package com.ict.springboot.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

private final UsersRepository usersRepository;
	

	//아이디와 비밀번호가 맞는지 비교해보고 맞으면 해당 유저 정보를 반환하고 없으면 null 반환
    public UsersDto isUser(UsersDto user) {

    	//로그인하는 계정이 있는지 확인
		Optional<UsersEntity> userOptional= usersRepository.findByAccountAndPassword(user.getAccount(), user.getPassword());
		UsersDto loginDto = (userOptional.map(UsersDto::toDto).orElse(null));
		
		return loginDto;
	}

	public void saveUser(UsersDto dto) {
		UsersEntity user = usersRepository.findByAccount(dto.getAccount()).orElseGet(()->null);
		if (user == null) {
			usersRepository.save(dto.toEntity());
		}
	}

    public UsersDto findLoginUser(UsersDto loginUser) {
		UsersEntity user = usersRepository.findByAccount(loginUser.getAccount()).orElseGet(()->null);
        return UsersDto.toDto(user);
    }

}

