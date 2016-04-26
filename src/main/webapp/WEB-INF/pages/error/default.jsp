<%@page language="java" pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<html>
<head>
<title>Exception</title>
</head>
<body>
	<%
		Exception ex = (Exception) request.getAttribute("exception");
	%>
	<H2>
		Exception:
		<%
			ex.getMessage();
		%>
	</H2>
	<P />
	<%
		ex.printStackTrace(new java.io.PrintWriter(out));
	%>
</body>
</html>