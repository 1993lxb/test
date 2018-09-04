package com.xt.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public final class StringUtils {

	public final static String dateToString(Date dt,String parrent)throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat(parrent);
		String dtstar=sdf.format(dt);
		return dtstar;
	}
}
