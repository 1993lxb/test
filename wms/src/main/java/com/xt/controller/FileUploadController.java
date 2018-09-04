package com.xt.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;




@Controller
@RequestMapping("/fileUpload")
public class FileUploadController {

	@RequestMapping("/upload")
	@ResponseBody
	public String import_tg_resource(@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request) throws IllegalStateException, IOException {
			String path = request.getSession().getServletContext().getRealPath("/");
			System.out.println(path);
			String fileName = file.getOriginalFilename();
			fileName ="dist/img/"+ new Date().getTime() + fileName;
			System.out.println(fileName);
			File targetFile = new File(path, fileName);
			if (!targetFile.exists()) {
				targetFile.mkdirs();
			}
			file.transferTo(targetFile);
		return fileName;
	}
}
