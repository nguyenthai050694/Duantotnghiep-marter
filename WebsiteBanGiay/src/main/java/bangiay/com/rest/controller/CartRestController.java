package bangiay.com.rest.controller;


import java.util.List;
import java.util.stream.Collectors;

import bangiay.com.DTO.MediaDTO;
import bangiay.com.doMain.constant;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.CartDTO;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "cart")
public class CartRestController {

	@Autowired
	private CartService cartService;
	@Autowired
	private ModelMapper modelMapper;
//	private static Logger logger = LoggerFactory.getLogger(CartController.class);

	@GetMapping("/getAll")
	public ResponseEntity<List<CartDTO>> getAll() {
		return ResponseEntity.ok().body(cartService.findAll());
	}
	@GetMapping("/select")
	public ResponseEntity<Page<CartDTO>> getPage(
			@RequestParam(name = constant.PAGE, defaultValue = constant.DEFAULT_PAGE) int page,
			@RequestParam(name = constant.SIZE, defaultValue = constant.DEFAULT_SIZE) int size
	) {
		Pageable pageable = PageRequest.of(page - 1 , size);
		return ResponseEntity.ok(cartService.findAll(pageable));
	}
	@GetMapping("/getCart")
	public ResponseEntity<List<CartDTO>> getCartByUser_Id(
			@RequestParam(value = "user_Id", required = false) Integer user_Id) {
		if (user_Id != null) {
			return ResponseEntity.ok().body(cartService.findByUser_Id(user_Id));
		}
		return ResponseEntity.ok().body(cartService.getCartNoUser());
	}


	@GetMapping("/getOneById")
	@CrossOrigin
	public ResponseEntity<CartDTO> getOneById(@RequestParam("id") Integer id) {
		Cart cart = cartService.findByID(id);
		CartDTO responCartDTO = modelMapper.map(cart, CartDTO.class);
		return ResponseEntity.ok().body(responCartDTO);
	}

	@PostMapping(value = "/update")
	public ResponseEntity<CartDTO> update(@RequestParam(name = "id") Integer id, @RequestBody CartDTO cartDTO) {
		cartDTO.setId(id);
		return ResponseEntity.ok().body(cartService.updateCart(cartDTO));
	}

	@PostMapping(value = "/create")
	public ResponseEntity<CartDTO> create(@RequestBody CartDTO dto) {
		return ResponseEntity.ok().body(cartService.createCart(dto));
	}

	@PostMapping(value = "/delete")
	public ResponseEntity<String> delete(@RequestParam(name = "id") Integer id) {
//		logger.info("Deleted cart with id : " + id);
		cartService.deleteById(id);
		return ResponseEntity.ok().body("Delete cart id " + id + " successfully!");
	}

	@PostMapping(value = "/addToCart")
	public ResponseEntity<List<CartDTO>> addToCart(@RequestBody CartDTO dto) {
		return ResponseEntity.ok().body(cartService.addToCartDTONoUser(dto));
	}

	@GetMapping(value = "/updateSizeNoUser/{pro_Id}")
	public ResponseEntity<List<CartDTO>> updateSizeNoUser(@PathVariable(name = "pro_Id") Integer pro_Id,
			@RequestParam(name = "size_Id") Integer size_Id) {
		return ResponseEntity.ok().body(cartService.updateSizeNoUser(pro_Id, size_Id));
	}

	@GetMapping(value = "/updateQuantityNoUser/{pro_Id}")
	public ResponseEntity<List<CartDTO>> updateQuantityNoUser(@PathVariable(name = "pro_Id") Integer pro_Id,
			@RequestParam("quantity") Integer quantity) {
		return ResponseEntity.ok().body(cartService.updatequantityNoUser(pro_Id, quantity));
	}
}
