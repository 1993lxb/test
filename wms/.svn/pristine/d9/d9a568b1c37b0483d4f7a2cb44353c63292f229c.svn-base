package com.xt.utils;

import java.io.Serializable;

public class  JsonResult<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String msg;
	private String erroCode;
	private T t;
	
	
	public JsonResult() {
		super();
	}
	public JsonResult(String msg, String erroCode) {
		super();
		this.msg = msg;
		this.erroCode = erroCode;
		
	}
	public JsonResult(String msg, String erroCode, T t) {
		super();
		this.msg = msg;
		this.erroCode = erroCode;
		this.t = t;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getErroCode() {
		return erroCode;
	}
	public void setErroCode(String erroCode) {
		this.erroCode = erroCode;
	}
	public T getT() {
		return t;
	}
	public void setT(T t) {
		this.t = t;
	}
	
}
