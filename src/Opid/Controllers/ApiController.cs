using Opid.Models;
using Opid.Models.Inputs;
using Opid.Utilities;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Opid.Controllers
{
	[Authorize]
	[ValidateModelState]
	public class ApiController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly ILogger _logger;

		public ApiController(
			UserManager<ApplicationUser> userManager,
			SignInManager<ApplicationUser> signInManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = loggerFactory.CreateLogger<ApiController>();
		}

		[HttpPost]
		[AllowAnonymous]
		[ValidateSessionAntiForgeryToken]
		public async Task<IActionResult> Register(RegisterInput model)
		{
			var user = new ApplicationUser
			{
				UserName = model.Email,
				Email = model.Email
			};
			var result = await _userManager.CreateAsync(user, model.Password);
			if (result.Succeeded)
			{
				await _signInManager.SignInAsync(user, isPersistent: false);
				_logger.LogInformation(3, "User created a new account with password.");

				return await GetUserObject(model.Email);
			}
			foreach (var error in result.Errors)
			{
				ModelState.AddModelError("errors", error.Description);
			}
			return HttpBadRequest(ModelState);
		}

		[HttpPost]
		[AllowAnonymous]
		[ValidateSessionAntiForgeryToken]
		public async Task<IActionResult> Login(LoginInput model)
		{
			var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
			if (result.Succeeded)
			{
				return await GetUserObject(model.Email);
			}
			ModelState.AddModelError("errors", "Invalid login attempt.");
			return HttpBadRequest(ModelState);
		}

		[HttpPost]
		[AllowAnonymous]
		[ValidateSessionAntiForgeryToken]
		public async Task<IActionResult> ForgotPassword(ForgotPasswordInput model)
		{
			var user = await _userManager.FindByNameAsync(model.Email);
			if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
			{
				// Don't reveal that the user does not exist or is not confirmed
				return Ok();
			}

			// For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
			// Send an email with this link
			//var code = await _userManager.GeneratePasswordResetTokenAsync(user);
			//var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
			//await _emailSender.SendEmailAsync(model.Email, "Reset Password",
			//   "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>");
			//return Ok();

			// If we got this far, something failed, redisplay form
			return HttpBadRequest();
		}

		[HttpPost]
		[ValidateSessionAntiForgeryToken]
		public async Task<IActionResult> LogOff()
		{
			await _signInManager.SignOutAsync();
			return Ok();
		}

		[AllowAnonymous]
		public Task<IActionResult> GetUser()
		{
			return GetUserObject(User.Identity.Name);
		}

		[HttpPost]
		[ValidateSessionAntiForgeryToken]
		public async Task<IActionResult> ChangePassword(ChangePasswordInput model)
		{
			var user = await GetCurrentUserAsync();
			if (user != null)
			{
				var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
				if (result.Succeeded)
				{
					await _signInManager.SignInAsync(user, isPersistent: false);
					return Ok();
				}
				foreach (var error in result.Errors)
				{
					ModelState.AddModelError("errors", error.Description);
				}
			}
			return HttpBadRequest(ModelState);
		}

		private async Task<ApplicationUser> GetCurrentUserAsync()
		{
			return await _userManager.FindByIdAsync(HttpContext.User.GetUserId());
		}

		private async Task<IActionResult> GetUserObject(string userName)
		{
			var user = await _userManager.FindByNameAsync(userName ?? string.Empty);
			return Json(new
			{
				userName = user?.UserName,
			});
		}
	}
}
