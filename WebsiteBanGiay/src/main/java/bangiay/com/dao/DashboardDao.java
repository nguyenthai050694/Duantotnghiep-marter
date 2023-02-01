package bangiay.com.dao;

import bangiay.com.entity.Order;
import bangiay.com.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.CrudMethodMetadata;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface DashboardDao extends CrudRepository<User, Integer> {
//	@Query("SELECT COUNT(1) FROM USER")
//	long ();
    @Query("SELECT COUNT(u) FROM User u")
	long countUser();

	//lấy danh sách order có trạng thái theo yêu cầu
//	@Query("select o from orders o where o.STATUS=?")
//	List<Orders> getOrderStatus(Integer status);

}
