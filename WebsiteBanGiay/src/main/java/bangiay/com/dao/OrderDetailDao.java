package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.OrderDetail;

@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer> {
	@Query("SELECT o FROM OrderDetail o WHERE o.order.id=?1")
	List<OrderDetail> findByOrder_Id(Integer id);
}
