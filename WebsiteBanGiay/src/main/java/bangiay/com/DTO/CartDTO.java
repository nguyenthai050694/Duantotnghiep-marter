package bangiay.com.DTO;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO implements Serializable {
	private Integer id;
	private Integer quantity;
	private Integer quantityTotal;
	private Integer user_Id;
	private Integer product_ID;
	private String name_Product;
	private String color_Product;
	private Integer size_Id;

	private String sizeName;
	private Timestamp creator;
	private Timestamp modifier;

	private Integer status;
	private Double price;
	private Integer category_Id;
	private Integer quantitySize;
	private Object size;
	private Object media;
}
