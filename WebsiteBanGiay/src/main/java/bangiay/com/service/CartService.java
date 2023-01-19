package bangiay.com.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import bangiay.com.DTO.CartDTO;
import bangiay.com.entity.Cart;

public interface CartService {

	CartDTO createCart(CartDTO cartDTO);

	List<CartDTO> findAll();

	Page<CartDTO> findAll(Pageable pageable);

	CartDTO updateCart(CartDTO cartDTO);

	CartDTO updateSize(Integer id, Integer size_Id);

	CartDTO quantity(Integer id, Integer quantity);

	void deleteById(Integer id);

	Cart findByID(Integer id);

	List<CartDTO> addToCartDTONoUser(CartDTO cartDTO);

	List<CartDTO> getCartNoUser();

	List<CartDTO> updateSizeNoUser(Integer id_pro, Integer size_Id);

	List<CartDTO> updatequantityNoUser(Integer id_pro, Integer quantity);

	List<CartDTO> findByUser_Id(Integer user_Id);

	void setStatusCardOrder(List<Cart> cart);
//    List<CartDTO> getCartNoUser();

}
