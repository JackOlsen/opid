using System.Web.Optimization;

namespace Opid
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
						"~/Scripts/jquery-{version}.js"));

			bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
						"~/Scripts/jquery.validate*"));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
						"~/Scripts/modernizr-*"));

			bundles.Add(new ScriptBundle("~/bundles/js")
				.Include("~/Scripts/angular.min.js")				
				.Include(
					"~/Scripts/respond.js",
					"~/Scripts/lodash.js",
					"~/Scripts/fastclick.min.js",
					"~/Scripts/moment.min.js",
					"~/Scripts/pgwslideshow.js",
					"~/Scripts/jquery.panzoom.min.js",
					"~/Scripts/angular-ui-router.min.js",
					"~/Scripts/ngMask.min.js",
					"~/Scripts/angular-filter.min.js",
					"~/Scripts/bootstrap.js",
					"~/Scripts/ui-bootstrap-tpls-1.3.3.min.js",
					"~/Scripts/opidApp.js")
				.IncludeDirectory("~/Scripts/app/", "*.js", true));

			bundles.Add(new StyleBundle("~/Content/css")
				.Include("~/Content/bootstrap/bootstrap.css")
				.Include(
					  "~/Content/pgwslideshow/pgwslideshow.css",
					  "~/Content/site.css"));
		}
	}
}
