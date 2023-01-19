package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Voucher;

@Repository
public interface VoucherDao extends JpaRepository<Voucher, Integer> {
	
}
