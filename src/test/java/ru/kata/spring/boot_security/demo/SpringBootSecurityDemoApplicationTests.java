package ru.kata.spring.boot_security.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@SpringBootTest
class SpringBootSecurityDemoApplicationTests {

	@Autowired
	private UserService service;
	@Autowired
	private PasswordEncoder encoder;

	@Test
	void contextLoads() {
		User user = new User();
		user.setFirstName("Vasya");
		user.setLastName("Perviy");
		user.setEmail("admin@mail.ru");
		user.setPassword(encoder.encode("12345"));
		user.setAge((byte) 24);
		service.add(user);
	}
}
