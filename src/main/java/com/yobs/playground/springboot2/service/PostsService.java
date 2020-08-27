package com.yobs.playground.springboot2.service;

import com.yobs.playground.springboot2.domain.posts.PostsRepository;
import com.yobs.playground.springboot2.web.dto.PostsSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostsService {
    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto){
        return postsRepository.save(requestDto.toEntity()).getId();
    }
}
