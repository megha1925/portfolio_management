package com.cts.authorization.util;

import lombok.Data;

@Data
public class JwtResponse {
	private final String jwttoken;
	private  String user;

	public JwtResponse(String jwttoken ,String user) {
		this.jwttoken = jwttoken;
		this.user=user;
	}
}