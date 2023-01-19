package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Cart;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {
	@Query("SELECT c FROM Cart c WHERE c.user.id =?1 AND c.status =1")
	List<Cart> findByUser_IdAndStatus1(Integer user_Id);

	@Query("SELECT c FROM Cart c WHERE c.status =1")
	List<Cart> findAllStatus1();
}
