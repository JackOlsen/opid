﻿using System.Web.Mvc;
using System.Web.Routing;

namespace Opid
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute(
				name: "Default",
				url: "api/{controller}/{action}/{id}",
				defaults: new { id = UrlParameter.Optional });

			routes.MapRoute(
                name: "spa",
                url: "{*url}",
                defaults: new { controller = "Home", action = "Index" });
        }
    }
}
