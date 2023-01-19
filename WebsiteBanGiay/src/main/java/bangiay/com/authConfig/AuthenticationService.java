package bangiay.com.authConfig;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;/
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import bangiay.com.dao.UserDao;
import bangiay.com.entity.Role;
import bangiay.com.entity.User;
//import bangiay.com.jwt.JwtEntrypoint;
//import bangiay.com.jwt.JwtFilter;
//import bangiay.com.service.AccountService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

@Service
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthenticationService implements UserDetailsService{
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Value("${secret}")
	private String secset;
	
	public ResponseEntity<?> auth(String userEmail , String password) throws Exception {
		User user = userDao.findUsersByUserEmail(userEmail);
		if(user == null) {
			throw new UsernameNotFoundException("Email not found");
		}
//		if(!passwordEncoder.matches(password, user.getPassword())) {
//			throw new Exception("Password is correct");
//		}
		if(!password.equals(user.getPassword())) {
			throw new Exception("Password is correct");
		}
		
		Algorithm algorithm = Algorithm.HMAC256(secset.getBytes());
		String access_token = JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
//				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles", user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList()))
				.sign(algorithm);
		String refresh_token = JWT.create()
				.withSubject(user.getEmail())
				.withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
//				.withIssuer(request.getRequestURL().toString())
				.sign(algorithm);
		Map<String, String> tokens = new HashMap<>();
		tokens.put("access_token", access_token);
		tokens.put("refresh_token", refresh_token);
//		tokens.put("name", user.getFullName());
//		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//		new ObjectMapper().writeValue(response.getOutputStream(), tokens);
		return ResponseEntity.ok().body(access_token);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findUsersByUserEmail(username);
		if(user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role ->{
			authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
		});
		org.springframework.security.core.userdetails.User user1 = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
		return user1;
	}
	
	
	
	
//	@Autowired
//	JwtEntrypoint jwtEntrypoint;
//	@Autowired
//	AccountService accountService;
//
//	@Autowired
//	JwtFilter jwtFilter;
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	public AuthenticationManager authenticationManagerBean(HttpSecurity httpSecurity) throws Exception {
//		return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(accountService)
//				.passwordEncoder(passwordEncoder()).and().build();
//	}
//
//	@Bean
//	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//		http.csrf().disable().cors();
//		http.authorizeHttpRequests().antMatchers("/auth/login").permitAll().anyRequest().authenticated();
		
//
//		http.authorizeHttpRequests().antMatchers("/auth/**", "/admin/user/**,/cart/**").permitAll().anyRequest()
//				.authenticated().and().exceptionHandling().authenticationEntryPoint(jwtEntrypoint).and()
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//		http.formLogin().loginPage("/login.html");

//		return http.build();
//	}

}
