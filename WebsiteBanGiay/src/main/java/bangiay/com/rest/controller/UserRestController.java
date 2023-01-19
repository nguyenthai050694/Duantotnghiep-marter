package bangiay.com.rest.controller;

import java.util.List;

import bangiay.com.doMain.constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.VoucherDTO;
import bangiay.com.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/user")
public class UserRestController {
	@Autowired
	UserService userService;

	
	
	@GetMapping("/get")
	public Page<UserDTO> findAll(@RequestParam(name="size" , defaultValue ="7")Integer size, 
			@RequestParam(name="page", defaultValue = "0")Integer page){
		return userService.findAll(size , page);
	}
	
//	@GetMapping("/index")
//	public List<UserDTO> findAll() {
//		return userService.findAll();
//	}
	

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") int id) {
		userService.delete(id);
	}
	
	@PostMapping("/post")
	public UserDTO post(@RequestBody UserDTO userDTO) {
		return userService.create(userDTO);
	}
	
	@PutMapping("/put/{id}")
	public UserDTO put(@PathVariable("id") Integer id, @RequestBody UserDTO userDTO) {
		userDTO.setId(id);
		System.out.println("thành" + userDTO.getRoleId());
		return userService.update(userDTO);
	}
	
	@GetMapping("/find/{id}")
	public UserDTO finByID(@RequestBody @PathVariable("id") int id, UserDTO userDTO) {
		return userService.finById(id);
	}
	
	@PutMapping("/setStatusFalse/{id}")
	public UserDTO setStatusFalse(@PathVariable Integer id) {
		return userService.setStatusFalse(id);
	}

}
