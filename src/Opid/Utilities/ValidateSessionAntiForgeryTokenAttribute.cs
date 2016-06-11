using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;
using System;
using Microsoft.AspNet.Http;

namespace Opid.Utilities
{
	public class ValidateSessionAntiForgeryTokenAttribute : Attribute, IFilterFactory, IOrderedFilter
	{
		public int Order { get; set; }

		public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
		{
			return new SessionAntiForgeryTokenFilter();
		}
	}

	public class SessionAntiForgeryTokenFilter : IAuthorizationFilter, IOrderedFilter
	{
		public const string XsrfTokenKey = "XSRF-TOKEN";

		public int Order { get; set; }

		public void OnAuthorization(AuthorizationContext context)
		{
			var sessionToken = context.HttpContext.Session.GetString(XsrfTokenKey);
			var cookieToken = context.HttpContext.Request.Cookies[XsrfTokenKey];
			if(sessionToken != cookieToken)
			{
				context.Result = new BadRequestObjectResult("Invalid authorization token.");
			}
		}
	}
}
