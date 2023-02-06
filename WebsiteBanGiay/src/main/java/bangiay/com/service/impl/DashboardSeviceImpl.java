package bangiay.com.service.impl;

import bangiay.com.DTO.*;
import bangiay.com.dao.*;
import bangiay.com.entity.*;
import bangiay.com.service.CartService;
import bangiay.com.service.DashboardService;
import bangiay.com.service.OrderDetailService;
import bangiay.com.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardSeviceImpl implements DashboardService {

	@Autowired
	private DashboardDao dashboardDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private OrderDao orderDao;

	@Override
	public DashboardDTO getDashboard() {
		DashboardDTO res = new DashboardDTO();

		//get Count
		getCount(res);

		//get List order detail 2 year
		getRevenue(res);

		// get data chart order
		getDataChartOrder(res);

		// get count order by status
		getCountOrder(res);

		//get list product order by revenue
		getListProduct(res);

		return res;
	}

	/**
	 * Get count
	 * @param res
	 */
	public void getCount(DashboardDTO res) {
		res.getCount().add(new DashboardCountDTO(userDao.countUser(),"Khách hàng"));
		res.getCount().add(new DashboardCountDTO(productDao.countAllProduct(),"Sản phẩm"));
		res.getCount().add(new DashboardCountDTO(orderDao.countAllOrder(),"Đơn hàng"));
	}

	/**
	 * Get list order detail 2 year ago
	 * @param res
	 */
	public void getRevenue(DashboardDTO res) {
		Date searchDate = setTimeNewDay(new Date());
		searchDate.setYear(searchDate.getYear() - 2);

		res.setListOrderDetail(orderDao.getOrderDetailDashboard(searchDate));
		List<Map<String, Object>> listOrderDetail = orderDao.getOrderDetailDashboard(searchDate);
		double dayMoney = 0;
		double lastDayMoney = 0;
		double weekMoney = 0;
		double lastWeekMoney = 0;
		double monthMoney = 0;
		double lastMonthMoney = 0;
		double yearMoney = 0;
		double lastYearMoney = 0;
		Date newDate = new Date();

		List<CommonValueDTO> dataChartRevenueByDay = new ArrayList<>();
		Map<String, Long> mapChartRevenueByDay = new HashMap<String, Long>();
		for (int i = 6; i >= 0; i--) {
			Date currentDate = new Date(newDate.getTime() - i*86400000);
			String keyEvenueByDay = currentDate.getDate() + "/" + (currentDate.getMonth() + 1);
			dataChartRevenueByDay.add(new CommonValueDTO(keyEvenueByDay,0L));
			mapChartRevenueByDay.put(keyEvenueByDay, 0L);
		}

		List<CommonValueDTO> dataChartRevenueByMonth = new ArrayList<>();
		Map<String, Long> mapChartRevenueByMonth = new HashMap<String, Long>();
		for (int i = 6; i >= 0; i--) {
			Date currentDate = new Date();
			Integer month = currentDate.getMonth() - i >= 0 ? currentDate.getMonth() - i : 12 + currentDate.getMonth() - i;
			currentDate.setMonth(month);
			String keyEvenueByMouth = (currentDate.getMonth() + 1) + "/" + (currentDate.getYear() + 1900);
			dataChartRevenueByMonth.add(new CommonValueDTO(keyEvenueByMouth,0L));
			mapChartRevenueByMonth.put(keyEvenueByMouth, 0L);
		}

		for (Map<String, Object> item : listOrderDetail) {
			Date itemDate = (Date) item.get("created");

			//Count money 1 day
			if(itemDate.getTime() >= setTimeNewDay(new Date()).getTime() && itemDate.getTime() <= setTimeLastDay(new Date()).getTime()) {
				dayMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}
			if(itemDate.getTime() >= setTimeNewDay(new Date(newDate.getTime() - 86400000)).getTime() && itemDate.getTime() <= setTimeLastDay(new Date(newDate.getTime() - 86400000)).getTime()) {
				lastDayMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}

			//Count money 1 week
			if(itemDate.getTime() >= setTimeNewDay(new Date(newDate.getTime() - 7*86400000)).getTime() && itemDate.getTime() <= setTimeLastDay(new Date()).getTime()) {
				weekMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}
			if(itemDate.getTime() >= setTimeNewDay(new Date(newDate.getTime() - 14*86400000)).getTime() && itemDate.getTime() <= setTimeLastDay(new Date(newDate.getTime() - 7*86400000)).getTime()) {
				lastWeekMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}

			//Count money 1 month
			if(itemDate.getTime() >= setTimeNewDay(new Date((newDate.getTime() - (long)30*86400000))).getTime() && itemDate.getTime() <= setTimeLastDay(new Date()).getTime()) {
				monthMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}
			if(itemDate.getTime() >= setTimeNewDay(new Date(newDate.getTime() - (long)60*86400000)).getTime() && itemDate.getTime() <= setTimeLastDay(new Date(newDate.getTime() - (long)30*86400000)).getTime()) {
				lastMonthMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}

			//Count money 1 year
			if(itemDate.getTime() >= setTimeNewDay(new Date((newDate.getTime() - (long)365*86400000))).getTime() && itemDate.getTime() <= setTimeLastDay(new Date()).getTime()) {
				yearMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}
			if(itemDate.getTime() >= setTimeNewDay(new Date(newDate.getTime() - (long)730*86400000)).getTime() && itemDate.getTime() <= setTimeLastDay(new Date(newDate.getTime() - (long)365*86400000)).getTime()) {
				lastYearMoney += (Integer) item.get("quantity") * (Double) item.get("price");
			}

			String keyEvenueByDay = itemDate.getDate() + "/" + (itemDate.getMonth() + 1);
			if(mapChartRevenueByDay.containsKey(keyEvenueByDay)) {
				mapChartRevenueByDay.put(keyEvenueByDay, (long) (mapChartRevenueByDay.get(keyEvenueByDay) + (Integer) item.get("quantity") * (Double) item.get("price")));
			}

			String keyEvenueByMonth = (itemDate.getMonth() + 1) + "/" + (itemDate.getYear() + 1900);
			if(mapChartRevenueByMonth.containsKey(keyEvenueByMonth)) {
				mapChartRevenueByMonth.put(keyEvenueByMonth, (long) (mapChartRevenueByMonth.get(keyEvenueByMonth) + (Integer) item.get("quantity") * (Double) item.get("price")));
			}
		}

		res.getRevenue().add(new DashboardRevenueDTO(dayMoney, lastDayMoney == 0 ? 100 : (int) (dayMoney == 0 ? -100 : Math.floor(((dayMoney > lastDayMoney ? 0 : -1) + dayMoney / lastDayMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(weekMoney, lastWeekMoney == 0 ? 100 : (int) (weekMoney == 0 ? -100 : Math.floor(((weekMoney > lastWeekMoney ? 0 : -1) + weekMoney / lastWeekMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(monthMoney, lastMonthMoney == 0 ? 100 : (int) (monthMoney == 0 ? -100 : Math.floor(((monthMoney > lastMonthMoney ? 0 : -1) + monthMoney / lastMonthMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(yearMoney, lastYearMoney == 0 ? 100 : (int) (yearMoney == 0 ? -100 : Math.floor(((yearMoney > lastYearMoney ? 0 : -1) + yearMoney / lastYearMoney) * 100))));

		for (int i = 0; i < dataChartRevenueByDay.size(); i++) {
			dataChartRevenueByDay.get(i).setValue(mapChartRevenueByDay.get(dataChartRevenueByDay.get(i).getKey()));
		}
		res.setDataChartRevenueByDay(dataChartRevenueByDay);

		for (int i = 0; i < dataChartRevenueByMonth.size(); i++) {
			dataChartRevenueByMonth.get(i).setValue(mapChartRevenueByMonth.get(dataChartRevenueByMonth.get(i).getKey()));
		}
		res.setDataChartRevenueByMonth(dataChartRevenueByMonth);
	}

	/**
	 * get Data Chart Order
	 * @param res
	 */
	public void getDataChartOrder(DashboardDTO res) {
		List<CommonValueDTO> dataChartOrder = new ArrayList<>();
		Date newDate = new Date();
		List<Order> listOrderOneWeek = orderDao.getOrderOneWeek(setTimeNewDay(new Date(newDate.getTime() - 7*86400000)));
		Map<String, Long> mapChartOrder = new HashMap<String, Long>();
		for (int i = 6; i >= 0; i--) {
			Date currentDate = new Date(newDate.getTime() - i*86400000);
			String key = currentDate.getDate() + "/" + (currentDate.getMonth() + 1);
			mapChartOrder.put(key, 0L);
			dataChartOrder.add(new CommonValueDTO(key,0L));
		}
		for (Order item: listOrderOneWeek) {
			String key = item.getCreated().getDate() + "/" + (item.getCreated().getMonth() + 1);
			if(mapChartOrder.containsKey(key)) {
				mapChartOrder.put(key, mapChartOrder.get(key) + 1);
			}
		}
		for (int i = 0; i < dataChartOrder.size(); i++) {
			dataChartOrder.get(i).setValue(mapChartOrder.get(dataChartOrder.get(i).getKey()));
		}

		res.setDataChartOrder(dataChartOrder);
	}

	/**
	 *  get count order by status
	 * @param res
	 */
	public void getCountOrder(DashboardDTO res) {
		res.getCountOrder().add(new CommonValueDTO("Đơn hàng mới",orderDao.countOrderByStatus(1)));
		res.getCountOrder().add(new CommonValueDTO("Đơn hàng chờ giao",orderDao.countOrderByStatus(2)));
		res.getCountOrder().add(new CommonValueDTO("Đơn hàng đang giao",orderDao.countOrderByStatus(3)));
		res.getCountOrder().add(new CommonValueDTO("Đơn hàng hủy",orderDao.countOrderByStatus(0)));
	}

	public void getListProduct(DashboardDTO res) {
		List<Map<String, Object>> listProductDetail = productDao.getListProductOrderByRevenue();
		Map<Integer,DashboardOrderDetailDTO> mapProduct = new HashMap<>();
		List<Integer> keyMap = new ArrayList<>();
		for (Map<String, Object> item : listProductDetail) {
			Double total = item.get("total") != null ? (Double) item.get("total") : 0;
			Integer key = (Integer) item.get("id");
			if(mapProduct.containsKey(key)) {
				DashboardOrderDetailDTO itemMap = mapProduct.get(key);
				itemMap.setQuantity(itemMap.getQuantity() + (item.get("order_quantity") != null ? ((BigDecimal) item.get("order_quantity")).intValue() : 0));
				itemMap.setRevenue(itemMap.getRevenue() + (item.get("total") != null ? ((Double) item.get("total")) : 0));
				mapProduct.put(key, itemMap);
			} else {
				keyMap.add((Integer) item.get("id"));
				mapProduct.put((Integer) item.get("id"),new DashboardOrderDetailDTO((Integer) item.get("id"),(String) item.get("name"),((BigDecimal) item.get("order_quantity")) != null ? ((BigDecimal) item.get("order_quantity")).intValue() : 0,item.get("total") != null ? (Double) item.get("total") : 0,(String) item.get("image")));
			}
//			res.getListProduct().add(new DashboardOrderDetailDTO((Integer) item.get("id"),(String) item.get("name"),((BigDecimal) item.get("order_quantity")) != null ? ((BigDecimal) item.get("order_quantity")).intValue() : 0,item.get("total") != null ? (Double) item.get("total") : 0,(String) item.get("image")));
		}

		for(Integer key : keyMap) {
			res.getListProduct().add(mapProduct.get(key));
		}
	}

	public Date setTimeNewDay(Date date) {
		Date res = new Date(date.getTime());
		res.setHours(0);
		res.setSeconds(0);
		res.setMinutes(0);
		return res;
	}

	public Date setTimeLastDay(Date date) {
		Date res = new Date(date.getTime());
		res.setHours(23);
		res.setSeconds(59);
		res.setMinutes(59);
		return res;
	}
}
