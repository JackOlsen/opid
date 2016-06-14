using System;

namespace Opid.Models
{
    interface IAuditableEntity
    {
        DateTimeOffset DateCreated { get; set; }
        string CreatedByUserId { get; set; }
    }
}
