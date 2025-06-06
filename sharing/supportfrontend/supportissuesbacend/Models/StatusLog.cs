
    using System;

namespace WebApplication2.Models
{
    public class StatusLog
    {
        public Guid Id { get; set; }
        public string StatusName { get; set; }
        public Guid MatableId { get; set; }
        public string MatableName { get; set; }
        public DateTime LogTime { get; set; }
        public Guid StatusId { get; internal set; }
    }
}