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
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User user;

	@Column(name = "CODE")
	private String code;

	@Column(name = "NAME_RECIPIENT")
	private String nameRecipient;

	@Column(name = "TELEPHONE")
	private String telephone;

	@Column(name = "ADDRESS")
	private String address;

	@Column(name = "CREATED")
	private java.sql.Timestamp created;

	@Column(name = "PAYMENTATDATE")
	private java.sql.Timestamp paymentAtDate;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "STATUS")
	private Integer status;

	@Column(name = "RETURNSTATUS")
	private Integer returnStatus;

	@Column(name = "RECAIVEATDATE")
	private java.sql.Timestamp recaiveAtDate;

	@Column(name = "COMPLETEDATDATE")
	private java.sql.Timestamp completedAtDate;

	@Column(name = "CANCELLEDATDATE")
	private java.sql.Timestamp cancelledAtDate;

	@Column(name = "RETURNATDATE")
	private java.sql.Timestamp returnAtDate;
}
