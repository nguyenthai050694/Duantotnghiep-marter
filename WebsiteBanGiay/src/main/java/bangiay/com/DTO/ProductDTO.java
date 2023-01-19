package bangiay.com.DTO;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ProductDTO {
	private Integer id;
	private Integer categoryId;
	private String name_cate;
	private String color;
	private String name;
	private String description;
	private String code;
	private Double price;
	private Integer quantity;
	private Timestamp created;
	private String creator;
	private Timestamp modified;
	private String modifier;
	private Integer status;
	private String image;
	private Object sizes;
	private Object medias;
}
