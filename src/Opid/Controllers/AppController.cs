using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Http;
using System;
using Opid.Utilities;

namespace Opid.Controllers
{
    public class AppController : Controller
	{
		public AppController()
		{ }        

		public IActionResult Index()
		{
			var guid = Guid.NewGuid();
			HttpContext.Session.SetString(SessionAntiForgeryTokenFilter.XsrfTokenKey, guid.ToString());
			Response.Cookies.Append(SessionAntiForgeryTokenFilter.XsrfTokenKey, guid.ToString());
			return View();
		}
    }
}
