package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import bangiay.com.DTO.CartDTO;
import bangiay.com.DTO.MediaDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.SizeDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.SizeDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Cart;
import bangiay.com.service.CartService;
import bangiay.com.service.MediaService;
import bangiay.com.service.ProductService;
import bangiay.com.service.SizeService;
import bangiay.com.utils.ObjectMapperUtils;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartDao cartDao;

	@Autowired
	private SizeDao sizeDao;

	@Autowired
	private SizeService sizeService;

	@Autowired
	private ProductService proService;

	@Autowired
	private MediaService mediaService;

	@Autowired
	UserDao userDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CartDTO createCart(CartDTO cartDTO) {
		Cart cart = modelMapper.map(cartDTO, Cart.class);
		cart.setCreated(Timestamp.from(Instant.now()));
		cart.setSize(sizeDao.findById(cartDTO.getSize_Id()).orElse(null));
		cart.setUser(userDao.findById(cartDTO.getUser_Id()).orElse(null));
		cart.setCreated(Timestamp.from(Instant.now()));
		Cart cartSave = cartDao.save(cart);
		cartDTO.setId(cartSave.getId());
		return cartDTO;
	}

	@Override
	public CartDTO updateCart(CartDTO cartDTO) {
		Cart cart = cartDao.findById(cartDTO.getId()).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
		// modelMapper.map(cartDTO,Cart.class);
		cart.setSize(sizeDao.findById(cartDTO.getSize_Id()).orElseThrow());
		cart.setQuantity(cartDTO.getQuantity());
		cart.setModified(Timestamp.from(Instant.now()));
		cart.setStatus(1);
		Cart cartSave = cartDao.save(cart);
//		cartDTO.setCreator(cartSave.getCreator());
//		cartDTO.setModifier(cartSave.getModifier());
		cartDTO.setId(cartSave.getId());
		// return modelMapper.map(cart, CartDTO.class);
		return cartDTO;
	}

	@Override
	public List<CartDTO> findAll() {
		return cartDao.findAllStatus1().stream().map(cart -> modelMapper.map(cart, CartDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Page<CartDTO> findAll(Pageable pageable) {
		return ObjectMapperUtils.mapEntityPageIntoDtoPage(cartDao.findAll(pageable), CartDTO.class);
	}

	@Override
	public List<CartDTO> findByUser_Id(Integer user_Id) {
		List<Cart> lstCart = this.cartDao.findByUser_IdAndStatus1(user_Id);
		List<CartDTO> lstCartDTO = lstCart.stream().map(cart -> modelMapper.map(cart, CartDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < lstCart.size(); i++) {
			lstCartDTO.get(i).setProduct_ID(lstCart.get(i).getSize().getProduct().getId());
			lstCartDTO.get(i).setName_Product(lstCart.get(i).getSize().getProduct().getName());
			lstCartDTO.get(i).setColor_Product(lstCart.get(i).getSize().getProduct().getColor());
			lstCartDTO.get(i).setPrice(lstCart.get(i).getSize().getProduct().getPrice());
			lstCartDTO.get(i).setSize_Id(lstCart.get(i).getSize().getId());
			lstCartDTO.get(i).setSizeName(lstCart.get(i).getSize().getSize());
			lstCartDTO.get(i).setQuantityTotal(lstCart.get(i).getSize().getProduct().getQuantity());
			lstCartDTO.get(i).setCategory_Id(lstCart.get(i).getSize().getProduct().getCategory().getId());
			lstCartDTO.get(i).setQuantitySize(lstCart.get(i).getSize().getQuantity());
			List<MediaDTO> media = this.mediaService.findAllByPro_Id(lstCart.get(i).getSize().getProduct().getId());
			byte[] datamedia = SerializationUtils.serialize(media);
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(lstCart.get(i).getSize().getProduct().getId());
			byte[] data = SerializationUtils.serialize(lstSizeDTO);
			lstCartDTO.get(i).setMedia(SerializationUtils.deserialize(datamedia));
			lstCartDTO.get(i).setSize(SerializationUtils.deserialize(data));
		}
		return lstCartDTO;
	}

	@Override
	public void deleteById(Integer id) {
		Cart cart = cartDao.findById(id).orElseThrow(() -> new RuntimeException("Cart isn't existed"));
		cart.setStatus(0);
		cartDao.save(cart);
	}

	@Override
	public Cart findByID(Integer id) {
		return cartDao.findById(id).orElseThrow(() -> new RuntimeException("User isn't existed"));
	}

	private List<CartDTO> lstCart = new ArrayList<CartDTO>();

	@Override
	public List<CartDTO> addToCartDTONoUser(CartDTO cartDTO) {
		SizeDTO size = this.sizeService.findById(cartDTO.getSize_Id());
		ProductDTO pro = this.proService.finById(size.getProductId());
		cartDTO.setProduct_ID(pro.getId());
		for (CartDTO c : lstCart) {
			if (c.getSize_Id().equals(size.getId())) {
				c.setQuantity(c.getQuantity() + cartDTO.getQuantity());
				return lstCart;
			}
		}
		cartDTO.setColor_Product(pro.getColor());
		cartDTO.setName_Product(pro.getName());
		cartDTO.setPrice(pro.getPrice());
		cartDTO.setQuantityTotal(pro.getQuantity());
		List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(pro.getId());
		byte[] data = SerializationUtils.serialize(lstSizeDTO);
		cartDTO.setSize(SerializationUtils.deserialize(data));
		lstCart.add(cartDTO);
		return lstCart;
	}

	@Override
	public List<CartDTO> getCartNoUser() {
		for (int i = 0; i < lstCart.size(); i++) {
			SizeDTO size = this.sizeService.findById(lstCart.get(i).getSize_Id());
			ProductDTO pro = this.proService.finById(size.getProductId());
			lstCart.get(i).setProduct_ID(pro.getId());
			lstCart.get(i).setName_Product(pro.getName());
			lstCart.get(i).setPrice(pro.getPrice());
			lstCart.get(i).setSizeName(size.getSize());
			lstCart.get(i).setQuantityTotal(pro.getQuantity());
			lstCart.get(i).setCategory_Id(pro.getCategoryId());
			lstCart.get(i).setQuantitySize(size.getQuantity());
			List<MediaDTO> media = this.mediaService.findAllByPro_Id(pro.getId());
			byte[] datamedia = SerializationUtils.serialize(media);
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(pro.getId());
			byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
			lstCart.get(i).setMedia(SerializationUtils.deserialize(datamedia));
			lstCart.get(i).setSize(SerializationUtils.deserialize(datalstSizeDTO));
		}
		return lstCart;
	}

	@Override
	public CartDTO updateSize(Integer id, Integer size_Id) {
		return null;
	}

	@Override
	public CartDTO quantity(Integer id, Integer quantity) {

		return null;
	}

	@Override
	public List<CartDTO> updateSizeNoUser(Integer id_pro, Integer size_Id) {
		for (CartDTO c : lstCart) {
			if (c.getProduct_ID().equals(id_pro)) {
				SizeDTO size = this.sizeService.findById(size_Id);
				c.setSize_Id(size_Id);
				c.setQuantitySize(size.getQuantity());
			}
		}
		return lstCart;
	}

	@Override
	public List<CartDTO> updatequantityNoUser(Integer id_pro, Integer quantity) {
		for (CartDTO c : lstCart) {
			if (c.getProduct_ID().equals(id_pro)) {
				c.setQuantity(quantity);
			}
		}
		return lstCart;
	}

	@Override
	public void setStatusCardOrder(List<Cart> cart) {
		for (int i = 0; i < cart.size(); i++) {
			cart.get(i).setStatus(0);
		}
		cartDao.saveAll(cart);
	}
}
