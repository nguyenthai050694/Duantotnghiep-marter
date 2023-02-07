package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.OrderCancelDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import bangiay.com.DTO.OrderDTO;
import bangiay.com.entity.Order;

public interface OrderService {

	public List<OrderDTO> findAll();

	public List<Order> findByStatus(Integer status);

	Page<OrderDTO> findAll(Pageable pageable);

	public List<OrderDTO> findOrderBySize_ID(Integer user_IdOrTelephone);

	// Cập nhật thanh toán đơn hàng thành công
	public OrderDTO updatePaymentOrder(Integer id);

	// Cập nhật đơn hàng bị hủy
	public OrderDTO updateCancelOrder(Integer id);

	// Cập nhật đơn hàng đã giao
	public OrderDTO updateDeliveredOrder(Integer id);

	public OrderDTO findById(Integer id);

	// Tìm danh sách đơn hàng theo user_Id hoặc SĐT
	public List<OrderDTO> findByUser_IdOrTelephone(String user_idOrTelephone);

	List<OrderDTO> updateDelivered(Integer user_IdOrTelephone);

	// List<OrdersDTO> getOrderStatus(Integer status);

	Order updateOrderWithStatus(Integer id, Integer status);

	OrderDTO create(OrderDTO orderDTO, Integer user_Id, Integer voucher_Id);

	public OrderDTO updateCompletedOrder(Integer id);

	public OrderDTO updateReturnStatus(OrderCancelDTO orderCancelDTO);
}
