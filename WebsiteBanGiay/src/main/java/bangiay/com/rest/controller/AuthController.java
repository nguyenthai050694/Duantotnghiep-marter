package bangiay.com.rest.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.LoginDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.authConfig.AuthenticationService;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;
//import bangiay.com.jwt.JwtUtil;
import bangiay.com.service.AccountService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AccountService accService;
	private final AuthenticationService authenticationService;
	private final ModelMapper modelMapper;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String userEmail ,@RequestParam String password) throws IOException {
		try {
			return authenticationService.auth(userEmail, password);
		} catch (Exception e) {
//			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/information")
	public ResponseEntity<?> getInfonmation(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userEmail = authentication.getName();
		if(userEmail == null || userEmail.equals("")) {
			return null;
		}
		User userInformation = accService.getUser(userEmail);
		if(userInformation != null) {
			UserDTO userDTO = modelMapper.map(userInformation, UserDTO.class);
			return ResponseEntity.ok().body(userDTO);
		}
		return null;
	}
	
	

//	@Autowired
//	AuthenticationManager authenticationManager;
//
//	@Autowired
//	AccountService accountService;
//
//	@Autowired
//	JwtUtil jwtUtil;
//
//	@Autowired
//	UserDao userDao;
//
//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws Exception {
//		try {
//			List<User> u = this.userDao.findUserByEmailOrTelePhone(loginDTO.getUsername(), loginDTO.getUsername());
//			if (u.isEmpty()) {
//				throw new Exception("tên đăng nhập không đúng");
//			}
//			if (u.size() > 1) {
//				throw new Exception("tên đăng nhập vượt quá mức");
//			}
//			if (u.get(0).getPassword().equals(loginDTO.getPass())) {
//				User user = u.get(0);
//
//				UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());

//				UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
//						.password(user.getPassword()).build();

//				String token = jwtUtil.GenerateToken(userDetails);
//				return ResponseEntity.ok(token);
//			} else {
//				throw new Exception("Mat khau khong dung");
//			}

//			authenticationManager
//					.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPass()));
//		} catch (DisabledException e) {
//			throw new Exception("USER_DISABLED", e);
//		} catch (BadCredentialsException e) {
//			throw new Exception("INVALID_CREDENTIALS", e);
//		}

//		final UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());
//
//		final String token = jwtUtil.GenerateToken(userDetails);
//		System.out.println(jwtUtil.getUsernameByToken(token));
//		return token;
//		final UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());
//
//		final String token = jwtUtil.GenerateToken(userDetails);

//		return ResponseEntity.ok(new ResponseTokenDTO(token));
//	}

//	@PostMapping("/getLoginUser")
//	public String getLogin(@ModelAttribute ResponseTokenDTO token) {
//		String user_Id = jwtUtil.getUsernameByToken(token.getToken());
//		return user_Id;
//	}

}
