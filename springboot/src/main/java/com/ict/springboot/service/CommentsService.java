package com.ict.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ict.springboot.dto.CommentsDto;
import com.ict.springboot.entity.CommentsEntity;
import com.ict.springboot.entity.FeedsEntity;
import com.ict.springboot.entity.UsersEntity;
import com.ict.springboot.repository.CommentsRepository;
import com.ict.springboot.repository.FeedsRepository;
import com.ict.springboot.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentsService {

    private final CommentsRepository commentsRepository;
    private final FeedsRepository feedsRepository;
    private final UsersRepository usersRepository;

    // 피드별 댓글 조회
    public List<CommentsDto> getCommentsByFeedId(Long feedId) {
        List<CommentsEntity> comments = commentsRepository.findByFeedIdOrderByCreatedAtDesc(feedId);
        return comments.stream()
                .map(CommentsDto::toDto)
                .collect(Collectors.toList());
    }

    // 댓글 생성
    public CommentsDto createComment(CommentsDto dto) {
        FeedsEntity feed = feedsRepository.findById(dto.getFeedId())
                .orElseThrow(() -> new IllegalArgumentException("피드를 찾을 수 없습니다."));
        UsersEntity user = usersRepository.findById(dto.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        CommentsEntity comment = CommentsEntity.builder()
                .content(dto.getContent())
                .feed(feed)
                .user(user)
                .build();

        comment = commentsRepository.save(comment);
        return CommentsDto.toDto(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId, Long userId) {
        CommentsEntity comment = commentsRepository.findById(commentId)
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