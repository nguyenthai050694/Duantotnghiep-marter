package bangiay.com.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	private Category category;

	@Column(name = "COLOR")
	private String color;

	@Column(name = "NAME")
	private String name;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "PRICE")
	private Double price;

	@Column(name = "QUANTITY")
	private Integer quantity;

	@Column(name = "CREATED")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@Column(name = "CREATOR")
	private String creator;

	@Column(name = "MODIFIED")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modified;

	@Column(name = "MODIFIER")
	private String modifier;

	@Column(name = "STATUS")
	private Integer status;
}
