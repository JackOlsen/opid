using System.ComponentModel.DataAnnotations;

namespace Opid.Models.Inputs
{
	public class ForgotPasswordInput
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; }
	}
}