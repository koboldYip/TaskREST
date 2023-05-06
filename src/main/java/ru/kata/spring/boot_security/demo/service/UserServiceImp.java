package ru.kata.spring.boot_security.demo.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserServiceImp implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(@Lazy UserRepository repository, @Lazy PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public Long add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user).getId();
    }

    @Override
    public User getById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    @Transactional
    public void update(User user) {
        User userDb = repository.findById(user.getId()).get();
        if (user.getPassword().isEmpty()) {
            user.setPassword(userDb.getPassword());
        } else {
            passwordEncoder.encode(user.getPassword());
        }
        repository.save(user);
    }

    @Override
    @Transactional
    public void delete(User user) {
        repository.delete(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Failed to retrieve user: " + username);
        }
        return user;
    }
}
