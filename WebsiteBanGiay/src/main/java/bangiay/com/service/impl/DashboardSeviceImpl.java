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

		//Get count
		res.getCount().add(new DashboardCountDTO(userDao.countUser(),"Khách hàng"));
		res.getCount().add(new DashboardCountDTO(productDao.countAllProduct(),"Sản phẩm"));
		res.getCount().add(new DashboardCountDTO(orderDao.countAllOrder(),"Đơn hàng"));

		//Get list order detail 2 year ago
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
		for (Map<String, Object> item : listOrderDetail) {
			Date itemDate = (Date) item.get("created");
			Date newDate = new Date();

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
		}

		res.getRevenue().add(new DashboardRevenueDTO(dayMoney, lastDayMoney == 0 ? 100 : (int) (dayMoney == 0 ? -100 : Math.floor(((dayMoney > lastDayMoney ? 0 : -1) + dayMoney / lastDayMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(weekMoney, lastWeekMoney == 0 ? 100 : (int) (weekMoney == 0 ? -100 : Math.floor(((weekMoney > lastWeekMoney ? 0 : -1) + weekMoney / lastWeekMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(monthMoney, lastMonthMoney == 0 ? 100 : (int) (monthMoney == 0 ? -100 : Math.floor(((monthMoney > lastMonthMoney ? 0 : -1) + monthMoney / lastMonthMoney) * 100))));
		res.getRevenue().add(new DashboardRevenueDTO(yearMoney, lastYearMoney == 0 ? 100 : (int) (yearMoney == 0 ? -100 : Math.floor(((yearMoney > lastYearMoney ? 0 : -1) + yearMoney / lastYearMoney) * 100))));

		List<CommonValueDTO> dataChartOrder = new ArrayList<>();
		Date newDate = new Date();
		List<Order> listOrderOneWeek = orderDao.getOrderOneWeek(setTimeNewDay(new Date(newDate.getTime() - 7*86400000)));
		Map<String, Long> mapChartOrder = new HashMap<String, Long>();
		for (int i = 6; i >= 0; i++) {
			Date currentDate = new Date(newDate.getTime() - i*86400000);
			String key = currentDate.getDate() + "/" + currentDate.getMonth();
			mapChartOrder.put(key, 0L);
		}
		for (Order item: listOrderOneWeek) {
			String key = item.getCreated().getDate() + "/" + item.getCreated().getMonth();
			if(mapChartOrder.containsKey(key)) {
				mapChartOrder.put(key, mapChartOrder.get(key) + 1);
			}
		}

//		List<CommonValueDTO> list = new ArrayList<CommonValueDTO>(new CommonValueDTO());
		return res;
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
