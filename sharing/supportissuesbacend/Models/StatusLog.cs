
    using System;

namespace WebApplication2.Models
{
    public class StatusLog
    {
        public Guid Id { get; set; }
        public string StatusName { get; set; }
        public Guid issues_id { get; set; }
        public string Name { get; set; }
        public DateTime LogTime { get; set; }
        public Guid StatusId { get; internal set; }
    }
}
