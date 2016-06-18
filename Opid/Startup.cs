using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Opid.Startup))]
namespace Opid
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
