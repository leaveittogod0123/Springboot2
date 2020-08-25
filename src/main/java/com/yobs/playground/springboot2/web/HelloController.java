package com.yobs.playground.springboot2.web;

import com.yobs.playground.springboot2.web.dto.HelloResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController // @ResponseBody
public class HelloController {
    @GetMapping("/hello") // 이전에는 @RequestMapping(method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }

    @GetMapping("/hello/dto")
    public HelloResponseDto helloDto(@RequestParam("name") String name, @RequestParam("amount") int amount) {
        return new HelloResponseDto(name, amount);
    }
}
