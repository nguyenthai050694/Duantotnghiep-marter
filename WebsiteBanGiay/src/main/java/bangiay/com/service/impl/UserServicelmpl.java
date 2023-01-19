package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.VoucherDTO;
import bangiay.com.dao.RoleDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;
import bangiay.com.entity.Voucher;
import bangiay.com.service.UserService;

@Service
public class UserServicelmpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private ModelMapper modelMapper;


//	@Override
//	public List<UserDTO> findAll() {
//		List<User> user = userDao.findAll();
//		List<UserDTO> result = user.stream().map(d -> modelMapper.map(d,UserDTO.class)).collect(Collectors.toList());
//		for (int i = 0; i < user.size(); i++) {
//			result.get(i).setNameRole(user.get(i).getRoler().getRoleName());
//		}
//		return result;
//	}


	@Override
	public UserDTO create(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);

//		user.setRole(this.roleDao.findById(userDTO.getRoleId()).get());

		user.setCreated(Timestamp.from(Instant.now()));
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
//		userDTO.setNameRole(user.getRole().getRoleName());
		return userDTO;
	}

	@Override
	public UserDTO update(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);

//		user.setRole(this.roleDao.findById(userDTO.getRoleId()).get());

		user.setCreated(user.getCreated());
		user.setModified(Timestamp.from(Instant.now()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
//		userDTO.setNameRole(user.getRole().getRoleName());
		return userDTO;
	}

	@Override
	public UserDTO finById(int id) {
		User user = userDao.findById(id).get();
		UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//		userDTO.setRoleId(user.getRole().getId());
		return userDTO;
	}

	@Override
	public void delete(int id) {
		userDao.deleteById(id);
	}


	public Page<UserDTO> findAll(Integer size , Integer page) {
		Pageable pageable = PageRequest.of(page, size);
		Page<User> entities = userDao.getPageWhereStatus(pageable);
		Page<UserDTO> dtoPage = entities.map(new Function<User, UserDTO>() {
		    @Override
		    public UserDTO apply(User entity) {
		    	UserDTO dto = new UserDTO();
		        dto = modelMapper.map(entity, UserDTO.class);
		        dto.setId(entity.getId());
//		        dto.setNameRole(entity.getRole().getRoleName());
		        return dto;
		    }
		});
		return dtoPage;
	}

	@Override
	public UserDTO setStatusFalse(Integer id ) {
		User user = this.userDao.findById(id).orElseGet(null);
		user.setStatus(0);
		this.userDao.save(user);
		UserDTO user1 = modelMapper.map(user, UserDTO.class);
		user1.setStatus(0);
		return user1;
	}
//	@Override
//	public Optional findUserByEmail(String email) {
//		return userDao.findByEmail(email);
//	}
//
//	@Override
//	public Optional findUserByResetToken(String resetToken) {
//		return userDao.findByResetToken(resetToken);
//	}
//
//	@Override
//	public void save(User user) {
//		userDao.save(user);
//	}

}
