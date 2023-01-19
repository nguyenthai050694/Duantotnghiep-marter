//package bangiay.com.jwt;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.xml.bind.DatatypeConverter;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import bangiay.com.DTO.UserDTO;
//import bangiay.com.dao.UserDao;
//import bangiay.com.entity.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//@Service
//public class JwtUtil {
//	private static final String ADMIN = "ROLE_ADMIN";
//	private static final String CUSTOMER = "ROLE_KHACHHANG";
//	private static final String STAFF = "ROLE_NHANVIEN";
//
//	private String secret;
//
//	private int jwtExpirationInMs;
//
//	@Autowired
//	private UserDao userDao;
//
//	@Value("${jwt.secret}")
//	public void setSecret(String secret) {
//		this.secret = secret;
//	}
//
//	@Value("${jwt.jwtExpirationInMs}")
//	public void setJwtExpirationInMs(int jwtExpirationInMs) {
//		this.jwtExpirationInMs = jwtExpirationInMs;
//	}
//
//	public String GenerateToken(UserDetails userDetails) {
//		Map<String, Object> claims = new HashMap<>();
//		Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
//		if (roles.contains(new SimpleGrantedAuthority(ADMIN))) {
//			claims.put("isADMIN", true);
//		}
//		if (roles.contains(new SimpleGrantedAuthority(CUSTOMER))) {
//			claims.put("isKhachHang", true);
//		}
//		if (roles.contains(new SimpleGrantedAuthority(STAFF))) {
//			claims.put("isNhanVien", true);
//		}
//
//		List<User> user = this.userDao.findUserByEmailOrTelePhone(userDetails.getUsername(), userDetails.getUsername());
//		UserDTO userDTO = new UserDTO();
//		userDTO.setId(user.get(0).getId());
//		userDTO.setEmail(user.get(0).getEmail());
//		userDTO.setTelephone(user.get(0).getTelephone());
//		claims.put("user", userDTO);
//		String token = Jwts.builder().setClaims(claims).setSubject(String.valueOf(user.get(0).getId()))
//				.setIssuedAt(new Date(System.currentTimeMillis()))
//				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
//				.signWith(SignatureAlgorithm.HS256, secret).compact();
//
//		Claims claims1 = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).parseClaimsJws(token)
//				.getBody();
//
//		return token;
//
//	}
//
//	public UserDTO getLoadToken(String token) {
//		UserDTO user = new UserDTO();
//		Claims claims1 = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).parseClaimsJws(token)
//				.getBody();
//		user.setId(Integer.parseInt(claims1.getId()));
//		user.setEmail(claims1.getEmail());
//		user.setTelephone(claims1.getTelephone());
//		return user;
//	}
//
//	public boolean validateToken(String token) {
//		try {
//			Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
//			return true;
//		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException
//				| IllegalArgumentException exception) {
//			throw new BadCredentialsException("INVALID_CREDENTIALS", exception);
//		} catch (ExpiredJwtException e) {
//			throw e;
//		}
//	}
//
//	public String getUsernameByToken(String token) {
//		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//		return claims.getSubject();
//	}
//
//	public List<SimpleGrantedAuthority> getRoleByToken(String token) {
//		List<SimpleGrantedAuthority> roles = null;
//		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
//		Boolean isADMIN = claims.get("isADMIN", Boolean.class);
//		Boolean isKhachHang = claims.get("isKhachHang", Boolean.class);
//		Boolean isNhanVien = claims.get("isNhanVien", Boolean.class);
//
//		if (isADMIN != null && isADMIN == true) {
//			roles = Arrays.asList(new SimpleGrantedAuthority(ADMIN));
//		}
//		if (isKhachHang != null && isKhachHang == true) {
//			roles = Arrays.asList(new SimpleGrantedAuthority(CUSTOMER));
//		}
//		if (isNhanVien != null && isNhanVien == true) {
//			roles = Arrays.asList(new SimpleGrantedAuthority(STAFF));
//		}
//
//		return roles;
//	}
//
//}
