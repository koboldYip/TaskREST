package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current_user")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        User userDb = userService.getById(user.getId());
        if (userDb == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDb);
    }
}
