using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;

namespace Opid.Utilities
{
	public class ValidateModelStateAttribute : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			if (!context.ModelState.IsValid)
			{
				// If ModelState is invalid, something has gone wrong client side or someone is bypassing client side validation.
				// In either case, no need to provide specific error messaging.
				context.Result = new BadRequestObjectResult("Bad Request");				
			}
			base.OnActionExecuting(context);
		}
	}
}
