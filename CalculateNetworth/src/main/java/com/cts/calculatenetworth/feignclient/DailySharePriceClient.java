package com.cts.calculatenetworth.feignclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.cts.calculatenetworth.vo.StockDetailsVO;

@FeignClient(url = "${dailyShare.URL}", name = "DAILYSHAREPRICE-SERVICE")
public interface DailySharePriceClient {
	
	@GetMapping(value="/daily/{stockName}", produces = MediaType.APPLICATION_JSON_VALUE)
	public StockDetailsVO getStockDetail(@RequestHeader("Authorization") String authorization,@PathVariable String stockName);

}
