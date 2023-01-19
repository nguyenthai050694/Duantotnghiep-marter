package bangiay.com.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Premission;

@Repository
public interface PermissionDao extends JpaRepository<Premission, Integer>{
}
