package bangiay.com.service;

import java.util.List;
import java.util.Optional;

import bangiay.com.entity.User;
import org.springframework.data.domain.Page;

import bangiay.com.DTO.UserDTO;

import bangiay.com.DTO.VoucherDTO;


public interface UserService {
	
//	public List<UserDTO> findAll();
	

	public UserDTO create(UserDTO userDTO);
	
	public UserDTO update(UserDTO userDTO);
	
	public Page<UserDTO> findAll (Integer size , Integer page);
	
	public UserDTO setStatusFalse(Integer id);
	
	public UserDTO finById(int id);
	
	public void delete(int id);
	//User findByUsername(String username);

//	public Optional<User> findUserByEmail(String email);
//	public Optional<User> findUserByResetToken(String reset_token);
//	public void save(User user);


}
