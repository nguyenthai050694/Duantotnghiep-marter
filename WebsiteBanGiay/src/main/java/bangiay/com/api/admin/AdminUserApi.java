package bangiay.com.api.admin;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.UserDTO;
import bangiay.com.service.AccountService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/admin/user")
@RequiredArgsConstructor
public class AdminUserApi {
	private final AccountService accountServicel;
	private final ModelMapper modelMapper;
	
	@GetMapping("/find-all")
	@PreAuthorize("hasPermission(#req, 'ROLE_ADMIN')")
	public ResponseEntity<?> getUsers(){
		UserDTO userDTO = modelMapper.map(accountServicel.getUser(), UserDTO.class);
		return ResponseEntity.ok().body(userDTO);
	}
}
