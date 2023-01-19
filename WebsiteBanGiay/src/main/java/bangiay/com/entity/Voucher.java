package bangiay.com.entity;

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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
@Table(name = "voucher")
public class Voucher {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Column(name = "ID")
	private Integer id;

	@Column(name = "NAME")
	private String name;

	@ManyToOne
	@JoinColumn(name = "CATEGORY_ID")
	@JsonIgnoreProperties(value = { "applications", "hibernateLazyInitializer" })
	private Category category;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "QUANTITY")
	private Integer quantity;

	@Column(name = "EFFECT_FROM")
	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date effectFrom;

	@Column(name = "EFFECT_UNTIL")
	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date effectUntil;

	@Column(name = "CREATED")
	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date created;

	@Column(name = "CREATOR")
	private String creator;

	@Column(name = "MODIFIED")
	@Temporal(TemporalType.TIMESTAMP)
	private java.util.Date modified;

	@Column(name = "MODIFIER")
	private String modifier;

	@Column(name = "VALUE")
	private Integer value;

	@Column(name = "TYPE")
	private Integer type;

	@Column(name = "STATUS")
	private Integer status;

}
