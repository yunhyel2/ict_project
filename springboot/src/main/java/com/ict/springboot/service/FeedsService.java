package com.ict.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.LikesEntity;
import com.ict.springboot.entity.LocationsEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.CommentsRepository;
import com.ict.springboot.repository.FeedsRepository;
import com.ict.springboot.repository.LikesRepository;
import com.ict.springboot.repository.LocationsRepository;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedsService {

    private final FeedsRepository feedRepo;
    private final LocationsRepository locationsRepository;
    private final UsersRepository usersRepository;
    private final CommentsRepository commentsRepository;
    private final LikesRepository likesRepository;
    
    //전체 조회
    public List<FeedsDto> getAll(){
        List<FeedsEntity> feedsEntities = feedRepo.findAllByOrderByCreatedAtDesc();
        return feedsEntities.stream().map(entity -> {
            FeedsDto dto = FeedsDto.todDto(entity);
            // 좋아요/댓글 수 설정
            dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
            dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));
            return dto;
        }).collect(Collectors.toList());
    }
    
    // 페이지네이션 조회
    public List<FeedsDto> getFeedsWithPagination(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedsEntity> feedsPage = feedRepo.findAllByOrderByCreatedAtDesc(pageable);
        
        return feedsPage.getContent().stream().map(entity -> {
            FeedsDto dto = FeedsDto.todDto(entity);
            // 좋아요/댓글 수 설정
            dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
            dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));
            return dto;
        }).collect(Collectors.toList());
    }

    
    //상세조회
    public FeedsDto getById(Long id){
        Optional<FeedsEntity> feedsEntity = feedRepo.findById(id);
        if (feedsEntity.isEmpty()) {
            return null;
        }
        
        FeedsEntity entity = feedsEntity.get();
        FeedsDto dto = FeedsDto.todDto(entity);
        
        // 좋아요/댓글 수 설정
        dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
        dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));
        
        return dto;
    }
    //생성
    public FeedsDto create(FeedsDto dto){
        boolean isDuplicated = feedRepo.existsById(dto.getId());
        if(isDuplicated) return null;

        // location
        LocationsEntity locationEntity = null;
        if (dto.getLocation() != null && dto.getLocation().getId() != 0) {
            locationEntity = locationsRepository.findById(dto.getLocation().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 location이 DB에 없습니다."));
        }

        // user
        UsersEntity userEntity = null;
        if (dto.getUser() != null && dto.getUser().getId() != 0) {
            userEntity = usersRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 user가 DB에 없습니다."));
        }

        FeedsEntity feedsEntity = FeedsEntity.builder()
            .content(dto.getContent())
            .image(dto.getImage())
            .user(userEntity)
            .location(locationEntity)
            .build();

        feedsEntity = feedRepo.save(feedsEntity);
        return FeedsDto.todDto(feedsEntity);
    }
    //삭제
    public FeedsDto delete(long id) throws Exception{
        FeedsEntity feed = feedRepo.findById(id).orElse(null);
        if(feed != null){
            try{
                // 엔티티를 직접 삭제하여 cascade가 제대로 작동하도록 함
                feedRepo.delete(feed);
                return FeedsDto.todDto(feed);
            } catch (Exception e){
                throw new Exception("데이터 삭제에 문제가 생겼습니다: " + e.getMessage());
            }
        }
        return null;
    }
    
    // 좋아요 토글
    public boolean toggleLike(Long feedId, Long userId) {
        boolean exists = likesRepository.existsByFeedIdAndUserId(feedId, userId);
        
        if (exists) {
            // 좋아요 취소
            likesRepository.findByFeedIdAndUserId(feedId, userId)
                .ifPresent(likesRepository::delete);
            return false;
        } else {
            // 좋아요 추가
            FeedsEntity feed = feedRepo.findById(feedId)
                .orElseThrow(() -> new IllegalArgumentException("피드를 찾을 수 없습니다."));
            UsersEntity user = usersRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            
            LikesEntity like = LikesEntity.builder()
                .feed(feed)
                .user(user)
                .build();
            likesRepository.save(like);
            return true;
        }
    }
    
    // 좋아요 수 조회
    public long getLikeCount(Long feedId) {
        return likesRepository.countByFeedId(feedId);
    }
    
    // 사용자가 좋아요를 눌렀는지 확인
    public boolean isLikedByUser(Long feedId, Long userId) {
        return likesRepository.existsByFeedIdAndUserId(feedId, userId);
    }

}
