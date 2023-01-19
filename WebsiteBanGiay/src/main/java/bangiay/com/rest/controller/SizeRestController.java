package bangiay.com.rest.controller;

import java.util.List;

import bangiay.com.doMain.constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bangiay.com.DTO.SizeDTO;
import bangiay.com.service.SizeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/size")
public class SizeRestController {
	@Autowired
	SizeService sizeService;

	@GetMapping("/index")
	public List<SizeDTO> findAll() {
		return sizeService.findAll();
	}
	@GetMapping("/select")
	public ResponseEntity<Page<SizeDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size
	) {
		Pageable pageable = PageRequest.of(page - 1 , size);
//        Page<User> userPage = userService.findAll(status,username,pageable);
//        Page<UserDTO> userDTOS = ObjectMapperUtils.mapEntityPageIntoDtoPage(userPage, UserDTO.class);
//        return ResponseEntity.ok().body(userDTOS);
//        return ResponseEntity.ok(userService.findAll(status,username,PageRequest.of(page - 1, size, userSorter.getSort())));
		return ResponseEntity.ok(sizeService.findAll(pageable));
	}
	@GetMapping("/find/{id}")
	public SizeDTO findAll(@PathVariable("id") Integer id) {
		return sizeService.findById(id);
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") Integer id) {
		sizeService.delete(id);
	}

	@PostMapping("/postList")
	public List<SizeDTO> postList(@RequestBody List<SizeDTO> SizeDTO) {
		return sizeService.saveList(SizeDTO);
	}

	@PostMapping("/post")
	public SizeDTO post(@RequestBody SizeDTO SizeDTO) {
		return sizeService.save(SizeDTO);
	}

	@PutMapping("/put/{id}")
	public SizeDTO put(@RequestBody SizeDTO SizeDTO, @PathVariable("id") Integer id) {
		SizeDTO.setId(id);
		return sizeService.save(SizeDTO);
	}
}
