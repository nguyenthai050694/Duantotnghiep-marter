package bangiay.com.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Media;

@Repository
public interface MediaDao extends JpaRepository<Media, Integer> {
	@Query("SELECT o FROM Media o WHERE o.product.id=?1")
	List<Media> findMediaByProduct_Id(Integer product_Id);

}
