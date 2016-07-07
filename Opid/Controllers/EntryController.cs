using System.Web.Mvc;

namespace Opid.Controllers
{
    public class EntryController : Controller
    {
        public JsonResult Save(
            string diagnosis,
            string description,
            string[] imageDescriptions)
        {
            var files = Request.Files;
            return Json(
                data: new
                {
                    success = true
                });
        }
    }
}