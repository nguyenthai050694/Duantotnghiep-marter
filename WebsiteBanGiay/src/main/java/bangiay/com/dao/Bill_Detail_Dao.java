package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.BillDetail;

@Repository
public interface Bill_Detail_Dao extends JpaRepository<BillDetail, Integer> {

	@Query("SELECT b FROM BillDetail b WHERE quantity = 1")
	List<BillDetail> findTop5();
}
