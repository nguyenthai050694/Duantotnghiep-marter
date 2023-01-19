package bangiay.com.rest.controller;

import java.util.List;
import java.util.Optional;

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

import bangiay.com.DTO.CategoryDTO;
import bangiay.com.entity.Category;
import bangiay.com.service.impl.CategoryServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/category")
public class CategoryRestController {
	@Autowired
	CategoryServiceImpl categoryService;

	@GetMapping("/get")
	public List<Category> findAll() {
		return categoryService.findAll();
	}

	@GetMapping("/select")
	public Page<CategoryDTO> findAll(@RequestParam(name = "size", defaultValue = "7") Integer size,
			@RequestParam(name = "page", defaultValue = "0") Integer page) {
		return categoryService.findAll(size, page);
	}

	@GetMapping("/get/{id}")
	public Category findById(@PathVariable int id) throws Exception {
		return categoryService.findById(id);
	}

	@PostMapping("/create")
	public Category save(@RequestBody Category category) {
		return categoryService.save(category);
	}

	@PutMapping("/update/{id}")
	public Category save(@RequestBody Category category, @PathVariable int id) throws Exception {
		return categoryService.updateById(id, category);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable int id) {
		categoryService.deleteById(id);
	}

	@GetMapping("/paging/{page}/{size}")
	public Page<Category> paging(@PathVariable Optional<Integer> pageNumbers, int size) {
		return categoryService.paging(pageNumbers, size);
	}

}
