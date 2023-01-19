package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.CartDTO;
import bangiay.com.DTO.OrderDTO;
import bangiay.com.dao.CartDao;
import bangiay.com.dao.OrderDao;
import bangiay.com.dao.ProductDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Cart;
import bangiay.com.entity.Order;
import bangiay.com.entity.Product;
import bangiay.com.entity.Size;
import bangiay.com.entity.User;
import bangiay.com.service.CartService;
import bangiay.com.service.OrderDetailService;
import bangiay.com.service.OrderService;

@Service
public class OrderSeviceImpl implements OrderService {

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private CartDao cartDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private CartService cartService;

	@Autowired
	private UserDao userDao;

	@Override
	public List<OrderDTO> findAll() {
		return this.orderDao.findAll().stream().map(o -> modelMapper.map(o, OrderDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public Page<OrderDTO> findAll(Pageable pageable) {
		return null;
	}

	@Override
	public List<OrderDTO> findOrderBySize_ID(Integer user_IdOrTelephone) {
		return null;
	}

	@Override
	public OrderDTO create(OrderDTO orderDTO, Integer user_Id, Integer voucher_Id) {
		Order order = modelMapper.map(orderDTO, Order.class);
		User user = this.userDao.findById(user_Id).orElse(null);
		order.setCreated(Timestamp.from(Instant.now()));
		order.setStatus(1);
		if (user != null) {
			order.setUser(user);
		}
		this.orderDao.save(order);
		List<Cart> lstCart;
		if (user != null) {
			lstCart = this.cartDao.findByUser_IdAndStatus1(user_Id);
		} else {
			List<CartDTO> lstCartDTO = this.cartService.getCartNoUser();
			lstCart = lstCartDTO.stream().map(d -> modelMapper.map(d, Cart.class)).collect(Collectors.toList());
			for (int i = 0; i < lstCart.size(); i++) {
				Product product = this.productDao.findById(lstCartDTO.get(i).getProduct_ID()).orElse(null);
				Size size = lstCart.get(i).getSize();
				size.setProduct(product);
				lstCart.get(i).setSize(size);
			}
		}
		orderDTO.setId(order.getId());
		this.orderDetailService.create(lstCart, order.getId(), voucher_Id);
		this.cartService.setStatusCardOrder(lstCart);
		return orderDTO;
	}

	@Override
	public OrderDTO updatePaymentOrder(Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		order.setPaymentAtDate(Timestamp.from(Instant.now()));
		order.setStatus(2);
		this.orderDao.save(order);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO updateCancelOrder(Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		order.setCancelledAtDate(Timestamp.from(Instant.now()));
		order.setStatus(0);
		this.orderDao.save(order);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO updateDeliveredOrder(Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		order.setRecaiveAtDate(Timestamp.from(Instant.now()));
		order.setStatus(3);
		this.orderDao.save(order);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO updateCompletedOrder(Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		order.setCompletedAtDate(Timestamp.from(Instant.now()));
		order.setStatus(4);
		this.orderDao.save(order);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public OrderDTO findById(Integer id) {
		Order order = this.orderDao.findById(id).orElse(null);
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public List<OrderDTO> findByUser_IdOrTelephone(String user_idOrTelephone) {

		return null;
	}

	@Override
	public List<OrderDTO> updateDelivered(Integer user_IdOrTelephone) {
		return null;
	}

	@Override
	public Order updateOrderWithStatus(Integer id, Integer status) {
		return null;
	}

}
