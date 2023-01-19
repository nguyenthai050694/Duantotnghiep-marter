package bangiay.com.service;

import java.util.List;

import bangiay.com.entity.Role;
import bangiay.com.entity.User;

public interface AccountService {
	void addRoleToUser(String userEmail, String roleName);

	User getUser(String userEmail);

	List<User> getUser();

	List<Role> getRole();

}
