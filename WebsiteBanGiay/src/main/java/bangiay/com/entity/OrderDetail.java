package bangiay.com.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "order_detail")
public class OrderDetail {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "VOUCHER_ID")
	private Voucher voucher;

	@ManyToOne
	@JoinColumn(name = "SIZE_ID")
	private Size size;

	@ManyToOne
	@JoinColumn(name = "ORDER_ID")
	private Order order;

	@Column(name = "QUANTITY")
	private Integer quantity;

	@Column(name = "PRICE")
	private Double price;

}
