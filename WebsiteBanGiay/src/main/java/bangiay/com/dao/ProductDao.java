package bangiay.com.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ', p.created, ' ', p.creator, ' ', p.modified, ' ', p.modifier, '') LIKE %?1% and p.status =1")
	public Page<Product> search(String keyword, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ') LIKE %?1% and p.category.id = ?2 and p.status =1")
	public Page<Product> searchClient(String keyword, Integer cate_Id, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ') LIKE %?1% and p.status =1")
	public Page<Product> searchClient(String keyword, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.status =1")
	Page<Product> findPageWhereStatus(Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.status =1 order by CREATED desc")
	List<Product> findTop3New();
}
