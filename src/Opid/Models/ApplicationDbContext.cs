using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using System;
using System.Data.SqlTypes;
using System.Linq;

namespace Opid.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IHttpContextAccessor ContextAccessor;

        public ApplicationDbContext(IHttpContextAccessor contextAccessor)
        {
            ContextAccessor = contextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            var userId = ContextAccessor.HttpContext.Session.GetString(Constants.AuthenticatedUserIdSessionKey) ?? null;
            foreach (var entry in ChangeTracker.Entries<IAuditableEntity>().ToList())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.DateCreated = DateTimeOffset.Now;
                        entry.Entity.CreatedByUserId = userId;
                        break;
                    case EntityState.Modified:
                        if (entry.Entity.DateCreated < SqlDateTime.MinValue.Value)
                        {
                            entry.Entity.DateCreated = DateTimeOffset.Now;
                        }
                        break;
                }
            }

            return base.SaveChanges();
        }

        public virtual DbSet<Entry> Entries { get; set; }
    }
}
