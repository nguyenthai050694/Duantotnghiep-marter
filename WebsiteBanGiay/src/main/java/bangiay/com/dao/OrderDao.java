package bangiay.com.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Order;

@Repository

public interface OrderDao extends JpaRepository <Order, Integer>{
	@Query("SELECT o FROM Order o WHERE o.user.id=?1 or o.telephone=?1")
	List<Order> getOrderBySize_ID(Integer user_IdOrTelephone);

	@Query("SELECT o FROM Order o WHERE o.status=?1")
	List<Order> findByStatus(Integer status);

	//lấy danh sách order có trạng thái theo yêu cầu
//	@Query("select o from orders o where o.STATUS=?")
//	List<Orders> getOrderStatus(Integer status);

	//Count all order
	@Query("SELECT COUNT(o) FROM Order o")
	long countAllOrder();

	//Count order by status
	@Query("SELECT COUNT(o) FROM Order o WHERE o.status = ?1")
	long countOrderByStatus(Integer status);

	@Query(
			value = "SELECT o.id, o.created, od.quantity, od.price from Orders o, Order_detail od where o.id=od.order_id and date(o.created) >= ?1 and date(o.created) <= now() and o.status != 0",
			nativeQuery = true
	)
	List<Map<String, Object>>  getOrderDetailDashboard(Date date);

	@Query("SELECT o FROM Order o WHERE o.created <= now() and o.created >= ?1 and o.status != 0")
	List<Order> getOrderOneWeek(Date date);
}
