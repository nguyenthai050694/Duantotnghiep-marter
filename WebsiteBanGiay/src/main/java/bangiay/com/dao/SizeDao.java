package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Size;

@Repository
public interface SizeDao extends JpaRepository<Size, Integer> {

	@Query("SELECT s FROM Size s WHERE s.product.id =?1")
	List<Size> findByPro_Id(Integer product_Id);

}
