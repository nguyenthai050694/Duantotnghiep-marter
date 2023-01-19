package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bangiay.com.dao.RoleDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Role;
import bangiay.com.entity.User;
import bangiay.com.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AccountServicelmpl implements AccountService{
	private final UserDao userDao;
	private final  RoleDao roleDao;
	private final PasswordEncoder passwordEncoder;
	
	
	@Override
	public void addRoleToUser(String userEmail, String roleName) {
		User user = userDao.findUsersByUserEmail(userEmail);
		if(user == null) {
			return;
		}
		List<String> roles = user.getRoles().stream().map(c->c.getRoleName()).collect(Collectors.toList());
		if(roles.contains(roleName)) {
			return;
		}
		Role role = roleDao.findByNameRole(roleName);
		if(role != null) {
			user.getRoles().add(role);
			userDao.save(user);
		}
	}

	@Override
	public User getUser(String userEmail) {
		return userDao.findUsersByUserEmail(userEmail);
	}

	@Override
	public List<User> getUser() {
		return userDao.findAll();
	}

	@Override
	public List<Role> getRole() {
		return roleDao.findAll();
	}
	
}
