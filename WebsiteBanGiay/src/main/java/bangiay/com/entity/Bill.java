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

@Data
@Entity
@Table(name = "bill")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;

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

	@Column(name = "CREATOR")
	private String creator;

	@Column(name = "MODIFIED")
	private java.sql.Timestamp modified;

	@Column(name = "MODIFIER")
	private String modifier;

	@Column(name = "STATUS")
	private Integer status;

	@ManyToOne
	@JoinColumn(name = "USER_ID")
	private User USER_ID;

}
