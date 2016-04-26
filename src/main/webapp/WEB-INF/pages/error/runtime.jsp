<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<html>
<head>
<title>Exception</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf8" />
<style type="text/css">
 body{
 	background:#ccc;
 	padding:20px;
 }
</style>
</head>
<body>
	<%
		Exception ex = (Exception) request.getAttribute("exception");
	%>
	<div class="error">
		<h1>
		<%
			ex.getMessage();
		%>
		</h1>
		<ul>
		<%
			ex.printStackTrace(new java.io.PrintWriter(out));
		%>			
		</ul>
	</div>
</body>
</html>