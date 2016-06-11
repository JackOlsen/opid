using Microsoft.AspNet.Mvc;
using Opid.Models;
using Opid.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Opid.Controllers
{
    public class ExampleController : Controller
    {
		private readonly ApplicationDbContext Db;
		private readonly CacheCow CacheCow;

		public ExampleController(
			ApplicationDbContext db,
			CacheCow cacheCow)
		{
			Db = db;
			CacheCow = cacheCow;
		}

		public IActionResult GetUsers(UserListArgs args)
		{
			int totalItemCount;
			var users = args.Apply(
				entities: Db.Users,
				totalItemCount: out totalItemCount);

			Response.Headers.Add("item-count", totalItemCount.ToString());

			return Json(
				data: users.Select(u => new
				{
					UserName = u.UserName,
					Email = u.Email,
					Id = u.Id,
					PhoneNumber = u.PhoneNumber,
					SecurityStamp = u.SecurityStamp
				}));
		}
    }

	public class UserListArgs : FilterAndSortExpressions<ApplicationUser, UserListArgs>, IPagingAndSortingArgs
	{
		public int pageSize { get; set; }
		public int pageNumber { get; set; }
		public string orderBy { get; set; }
		public bool orderDesc { get; set; }
		public string searchText { get; set; }

		private static readonly FilterPredicate<ApplicationUser, UserListArgs>[] _fp =
		{
			new FilterPredicate<ApplicationUser, UserListArgs>(
				isApplicable: args => !string.IsNullOrWhiteSpace(args.searchText),
				predicate: (u, args) => u.UserName.Contains(args.searchText))				
		};
		public override FilterPredicate<ApplicationUser, UserListArgs>[] FilterPredicates => _fp;

		private static readonly IDictionary<string, Expression<Func<ApplicationUser, string>>> ORDER_BY_STRING_KEY_SELECTORS =
			new Dictionary<string, Expression<Func<ApplicationUser, string>>>
			{
				["username"] = u => u.UserName,
				["email"] = u => u.Email,
				["id"] = u => u.Id,
				["phonenumber"] = u => u.PhoneNumber,
				["securitystamp"] = u => u.SecurityStamp,
			};
		public override IDictionary<string, Expression<Func<ApplicationUser, string>>> OrderByStringKeySelectors => ORDER_BY_STRING_KEY_SELECTORS;
	}
}
