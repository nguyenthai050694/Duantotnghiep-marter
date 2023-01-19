package bangiay.com.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Bill;

@Repository
public interface BillDao extends JpaRepository<Bill, Integer> {
	@Query("SELECT b FROM Bill b WHERE b.status =1")
	Page<Bill> findPageWhereStatus(Pageable pageable);
}
