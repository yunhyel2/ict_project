package com.ict.springboot;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import jakarta.persistence.EntityNotFoundException;



@RestControllerAdvice
public class GlobalExceptionController {

    //<< 모든 컨트롤러의 엔터티 조회 불능시 예외 처리>> 
	@ExceptionHandler({EntityNotFoundException.class})
	public ResponseEntity<String> entityNotFound(EntityNotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 아이디 입니다");
	}
	//<<부모 삭제시 자식 레코드가 있는 경우>>
	@ExceptionHandler({DataIntegrityViolationException.class})
	public ResponseEntity<Map<String,String>> dataIntegrityViolation(DataIntegrityViolationException e){
		Map<String,String> map= new HashMap<>();
		map.put("ERROR", "자식 레코드가 발견되었습니다");
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
	}
	//<<파일 업로드 용량 초과 예외>>	
	@ExceptionHandler({MaxUploadSizeExceededException.class})
	public ResponseEntity<Map<String,String>> maxUploadSizeError(MaxUploadSizeExceededException e) {
		
		Map<String,String> map= new HashMap<>();
		map.put("ERROR", "파일 업로드 최대 용량을 초과 했어요");		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
	}
}