using System;
using System.ComponentModel.DataAnnotations;

namespace Opid.Models
{
    public class Entry : IAuditableEntity
    {
        [Key]
        public int EntryId { get; set; }

        public string CreatedByUserId { get; set; }

        public virtual ApplicationUser CreatedByUser { get; set; }

        public DateTimeOffset DateCreated { get; set; }

        public string Description { get; set; }

        public string Diagnosis { get; set; }
    }
}
