package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {

	private List<DashboardCountDTO> count = new ArrayList<>();

	private List<Map<String, Object>> listOrderDetail = new ArrayList<>();

	private List<DashboardRevenueDTO> revenue = new ArrayList<>();

	private List<CommonValueDTO> dataChartOrder = new ArrayList<>();

	private List<CommonValueDTO> countOrder = new ArrayList<>();

	private List<CommonValueDTO> dataChartRevenueByDay = new ArrayList<>();

	private List<CommonValueDTO> dataChartRevenueByMonth = new ArrayList<>();

	private List<DashboardOrderDetailDTO> listProduct = new ArrayList<>();
}
