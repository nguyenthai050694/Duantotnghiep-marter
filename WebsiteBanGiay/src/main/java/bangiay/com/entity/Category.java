package bangiay.com.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name = "category")
public class Category {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "NAMECATE")
	@Lob
	private String namecate;

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

	@Column(name = "STATUS")
	private Integer status;
}
