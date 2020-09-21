package com.yobs.playground.springboot2.config.auth;

import com.yobs.playground.springboot2.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().headers().frameOptions().disable()  //h2-console화면을 사용하기 위해 해당 옵션들을 비활성화 시킨다.
                .and().authorizeRequests()  //URL별 권한 관리를 설정하는 옵션의 시작점. authorizeRequests가 선언되어야 antMatchers옵션을 사용가능.
                .antMatchers("/","css/**","/images/**","/js/**","/h2-console/**").permitAll() //antMatchers는 권한 관리 대상을 지정하는 옵션. URL,HTTP 메소드별로 관리가능."/" 등 URL을 지정하고 permitAll은 전체열람권한.
                .antMatchers("/api/v1/**").hasRole(Role.USER.name())  //user권한만 /api/v1 이하 열람가능
                .anyRequest().authenticated()  //설정된 값들 이외 나머지 URL 들은 인증된(로그인한) 사용자에게만 허용.
                .and().logout().logoutSuccessUrl("/")  // 로그아웃 성공시 / 로 이동
                .and().oauth2Login().userInfoEndpoint()  // 로그인 성공 이후 사용자 정보 가져올 때의 설정
                .userService(customOAuth2UserService);  //로그인 성공 시 후속 조치를 진행할 UserService 인터페이스의 구현체를 등록.
    }
}
