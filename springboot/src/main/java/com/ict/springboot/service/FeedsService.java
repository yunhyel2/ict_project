package com.ict.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ict.springboot.dto.FeedsDto;
import com.ict.springboot.dto.UsersDto;
import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.FeedLikesEntity;
import com.ict.springboot.entity.LocationsEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.FeedCommentsRepository;
import com.ict.springboot.repository.FeedsRepository;
import com.ict.springboot.repository.FeedLikesRepository;
import com.ict.springboot.repository.LocationsRepository;
import com.ict.springboot.repository.UsersRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedsService {

    private final FeedsRepository feedRepo;
    private final LocationsRepository locationsRepository;
    private final UsersRepository usersRepository;
    private final FeedCommentsRepository commentsRepository;
    private final FeedLikesRepository likesRepository;
    
    //전체 조회
    public List<FeedsDto> getAll(HttpSession session){
        List<FeedsEntity> feedsEntities = feedRepo.findAllByOrderByCreatedAtDesc();

        UsersDto user = (UsersDto)session.getAttribute("user");
        UsersEntity loginUser = usersRepository.findByAccount(user.getAccount()).orElseGet(()->null);
        if (loginUser == null) return null;

        return feedsEntities.stream().map(entity -> {
            FeedsDto dto = FeedsDto.todDto(entity);
            // 현재 로그인된 사용자가 이 글을 좋아요 했는가 여부 설정
            dto.setLiked(likesRepository.existsByFeedIdAndUserId(entity.getId(), loginUser.getId()));
            // 좋아요/댓글 수 설정
            dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
            dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));

            return dto;
        }).collect(Collectors.toList());
    }
    
    // 페이지네이션 조회
    public List<FeedsDto> getFeedsWithPagination(int page, int size, HttpSession session){
        UsersDto user = (UsersDto)session.getAttribute("user");
        UsersEntity loginUser = usersRepository.findByAccount(user.getAccount()).orElseGet(()->null);

        Pageable pageable = PageRequest.of(page, size);
        Page<FeedsEntity> feedsPage = feedRepo.findAllByOrderByCreatedAtDesc(pageable);
        
        return feedsPage.getContent().stream().map(entity -> {
            FeedsDto dto = FeedsDto.todDto(entity);
            // 현재 로그인된 사용자가 이 글을 좋아요 했는가 여부 설정
            if (loginUser != null) {
                dto.setLiked(likesRepository.existsByFeedIdAndUserId(entity.getId(), loginUser.getId()));
            }
            // 좋아요/댓글 수 설정
            dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
            dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));
            return dto;
        }).collect(Collectors.toList());
    }

    // 핫한 피드 조회 (메인용)
    public List<FeedsDto> getHotFeedsRecent(int limit, HttpSession session){
        List<FeedsEntity> feedsEntities = feedRepo.findHotByOrderByCreatedAtDescLimit(limit);

        UsersDto user = (UsersDto)session.getAttribute("user");
        UsersEntity loginUser = usersRepository.findByAccount(user.getAccount()).orElseGet(()->null);
        if (loginUser == null) return null;

        return feedsEntities.stream().map(entity -> {
            FeedsDto dto = FeedsDto.todDto(entity);
            // 현재 로그인된 사용자가 이 글을 좋아요 했는가 여부 설정
            dto.setLiked(likesRepository.existsByFeedIdAndUserId(entity.getId(), loginUser.getId()));
            // 좋아요/댓글 수 설정
            dto.setLikeCount(likesRepository.countByFeedId(entity.getId()));
            dto.setCommentCount(commentsRepository.countByFeedId(entity.getId()));

            return dto;
        }).collect(Collectors.toList());
    }
    
    //상세조회
    public FeedsDto getById(Long id, HttpSession session){
        Optional<FeedsEntity> feedsEntity = feedRepo.findById(id);
        if (feedsEntity.isEmpty()) return null;

        UsersDto user = (UsersDto)session.getAttribute("user");
        UsersEntity loginUser = usersRepository.findByAccount(user.getAccount()).orElseGet(()->null);
        if (loginUser == null) return null;

        FeedsEntity entity = feedsEntity.get();
        FeedsDto dto = FeedsDto.todDto(entity);
        // 현재 로그인된 사용자가 이 글을 좋아요 했는가 여부 설정
        dto.setLiked(likesRepository.existsByFeedIdAndUserId(entity.getId(), loginUser.getId()));
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
            
            FeedLikesEntity like = FeedLikesEntity.builder()
                .feed(feed)
                .user(user)
                .build();
            likesRepository.save(like);
            return true;
        }
    }
    
}
