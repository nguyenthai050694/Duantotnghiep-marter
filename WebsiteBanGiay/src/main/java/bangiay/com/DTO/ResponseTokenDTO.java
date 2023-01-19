package bangiay.com.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class ResponseTokenDTO implements Serializable {

	private String token;

	public ResponseTokenDTO(String token) {
		this.token = token;
	}

}
