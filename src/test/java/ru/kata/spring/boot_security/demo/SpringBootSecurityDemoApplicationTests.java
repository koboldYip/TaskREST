package ru.kata.spring.boot_security.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Arrays;

@SpringBootTest
class SpringBootSecurityDemoApplicationTests {

    @Autowired
    private UserService service;
    @Autowired
    private RoleService roleService;

    @Test
    void contextLoads() {
        Role admin = new Role("ADMIN");
        Role userRole = new Role("USER");
        roleService.add(admin);
        roleService.add(userRole);
        User user = new User();
        user.setFirstName("Vasya");
        user.setLastName("Perviy");
        user.setEmail("admin@mail.ru");
        user.setPassword("12345");
        user.setAge((byte) 24);
        user.setRoles(Arrays.asList(admin, userRole));
        service.add(user);
    }
}
