package bangiay.com.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer> {
	@Query("SELECT c FROM Category c WHERE c.status =1")
	Page<Category> findPageWhereStatus(Pageable pageable);
}
