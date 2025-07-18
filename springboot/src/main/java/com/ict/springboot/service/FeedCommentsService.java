package com.ict.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.FeedCommentsDto;
import com.ict.springboot.entity.FeedCommentsEntity;
import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.FeedCommentsRepository;
import com.ict.springboot.repository.FeedsRepository;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedCommentsService {

    private final FeedCommentsRepository commentsRepository;
    private final FeedsRepository feedsRepository;
    private final UsersRepository usersRepository;

    // 피드별 댓글 조회
    public List<FeedCommentsDto> getCommentsByFeedId(Long feedId) {
        List<FeedCommentsEntity> comments = commentsRepository.findByFeedIdOrderByCreatedAtDesc(feedId);
        return comments.stream()
                .map(FeedCommentsDto::toDto)
                .collect(Collectors.toList());
    }

    // 댓글 생성
    public FeedCommentsDto createComment(FeedCommentsDto dto) {
        FeedsEntity feed = feedsRepository.findById(dto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("피드를 찾을 수 없습니다."));
        UsersEntity user = usersRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        FeedCommentsEntity comment = FeedCommentsEntity.builder()
                .content(dto.getContent())
                .feed(feed)
                .user(user)
                .build();

        comment = commentsRepository.save(comment);
        return FeedCommentsDto.toDto(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId, Long userId) {
        FeedCommentsEntity comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        
        // 댓글 작성자만 삭제 가능
        if (comment.getUser().getId() != userId) {
            throw new IllegalArgumentException("댓글을 삭제할 권한이 없습니다.");
        }
        
        commentsRepository.delete(comment);
    }

    // 댓글 수 조회
    public long getCommentCount(Long feedId) {
        return commentsRepository.countByFeedId(feedId);
    }
} 