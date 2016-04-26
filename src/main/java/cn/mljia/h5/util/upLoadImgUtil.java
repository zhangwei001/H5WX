package cn.mljia.h5.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Map;

import org.apache.commons.httpclient.HttpVersion;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.InputStreamBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.util.EntityUtils;

import cn.mljia.component.util.JsonUtils;
import cn.mljia.component.util.UrlUtils;


/**
 * @author wangyz
 * @version 1.0.0
 * @since 2013-8-8 下午6:47:29
 */
public  class upLoadImgUtil {
	
	public String uploadImage(String upload_url, String image_url, String src_name) {
		
		HttpClient client = new DefaultHttpClient();
		client.getParams().setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);

		HttpPost post = new HttpPost(upload_url);

		MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName("UTF-8"));

		InputStream bis = null;
		try {
			bis = new ByteArrayInputStream(UrlUtils.getBytes(image_url));
			if (bis.available() <= 0) {
				throw new RuntimeException("网络访问错误。");
			}
			entity.addPart("files[]", new InputStreamBody(bis, "image/jpeg",  src_name));
			entity.addPart("sysid", new StringBody("3", "text/plain", Charset.forName("UTF-8")));
			entity.addPart("file_store_group", new StringBody("figure", "text/plain", Charset.forName("UTF-8")));
			entity.addPart("gen_thumb", new StringBody("true", "text/plain", Charset.forName("UTF-8")));
			post.setEntity(entity);

			HttpResponse response = client.execute(post);
			StatusLine statusLine = response.getStatusLine();

			if (statusLine.getStatusCode() == 200) {
				String content = EntityUtils.toString(response.getEntity());
				Map<String, Object> rootNode = JsonUtils.toMap4Obj(content);
				
				if (null != rootNode && rootNode.containsKey("status")) {
					Integer status = Integer.parseInt(String.valueOf(rootNode.get("status")));
					if (status == 200) {
						Object obj = rootNode.get("data");
						Map<String, Object> rootNod2 = JsonUtils.toMap4Obj(String.valueOf(obj));
						String id = String.valueOf(rootNod2.get("id"));
						//log.info("头像上传成功，标识=>>" + id);

						return id;
					} else {
						throw new RuntimeException("上传图片错误，请检查网络或配置。");
					}
				} else {
					throw new RuntimeException("上传图片错误，请检查网络或配置。");
				}
			} else {
				throw new RuntimeException("网络访问错误。");
			}
		} catch (IOException e) {
			//log.error("上传图片错误::" + e.getMessage());
		}
		return null;
	}

	
	
}
